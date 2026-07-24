import React, { useEffect, useState } from 'react';
import { X, LayoutDashboard, Package, FileText, LogOut, Eye, Check, Clock, Archive, TrendingUp, ShoppingBag, Users, Plus, Pencil, Trash2, Save, AlertCircle, Edit2, Search } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { products as initialProducts } from '../data/products';
import { Product, QuoteRequest } from '../types';
import { createProduct, deleteProduct, getAllProducts, updateProduct, uploadProductImage } from '../services/productService';
import { supabase } from '../services/supabase';

// Admin login
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (password === 'mahalia2026') {
      onLogin();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#2E4033] flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#2E4033]">Espace Admin</h1>
          <p className="text-sm text-[#2E4033]/50 mt-1">Nature Raphia & Boutique Mahalia</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest block mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false); }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border-2 rounded-xl text-[#2E4033] focus:outline-none transition-colors ${error ? 'border-red-400' : 'border-[#E6DFD3] focus:border-[#2E4033]'}`}
            />
            {error && (
              <div className="flex items-center gap-1 mt-2 text-red-500 text-xs">
                <AlertCircle size={12} />
                <span>Mot de passe incorrect</span>
              </div>
            )}
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#2E4033] hover:bg-[#1a2b1f] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : 'Se connecter'}
          </button>
          <p className="text-xs text-center text-[#2E4033]/30">Mot de passe démo : mahalia2026</p>
        </form>
      </div>
    </div>
  );
};

// Stats card
const StatCard: React.FC<{ icon: React.FC<any>; label: string; value: string | number; color: string; sub?: string }> = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
        <Icon size={20} style={{ color }} />
      </div>
      {sub && <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded-full">{sub}</span>}
    </div>
    <div className="font-serif text-2xl font-semibold text-[#2E4033]">{value}</div>
    <div className="text-xs text-[#2E4033]/50 mt-1">{label}</div>
  </div>
);

// Quote status badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const config: Record<string, { label: string; color: string }> = {
    nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
    en_cours: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
    traite: { label: 'Traité', color: 'bg-green-100 text-green-700' },
    archive: { label: 'Archivé', color: 'bg-gray-100 text-gray-500' },
  };
  const c = config[status] || config.nouveau;
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.color}`}>{c.label}</span>;
};

// Dashboard tab
const DashboardTab: React.FC<{ quotes: QuoteRequest[] }> = ({ quotes }) => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(3);

        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des produits mis en avant:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const newQuotes = quotes?.filter(q => q.status === 'nouveau').length || 0;
  const totalRevenue = quotes?.reduce((sum, q) => sum + (q.totalEstimate || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total demandes" value={quotes?.length || 0} color="#2E4033" />
        <StatCard icon={AlertCircle} label="Nouvelles demandes" value={newQuotes} color="#C97A53" sub={newQuotes > 0 ? '🔴 Action requise' : undefined} />
        <StatCard icon={ShoppingBag} label="Produits actifs" value={initialProducts.filter(p => p.inStock).length} color="#2E4033" />
        <StatCard icon={TrendingUp} label="Valeur estimée (Ar)" value={`~${totalRevenue.toLocaleString()} Ar`} color="#C97A53" sub="+12% ce mois" />
      </div>

      {/* Recent quotes */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E6DFD3] flex items-center justify-between">
          <h3 className="font-semibold text-[#2E4033]">Dernières demandes</h3>
          <span className="text-xs text-[#2E4033]/40">{quotes?.length || 0} total</span>
        </div>
        {!quotes || quotes.length === 0 ? (
          <div className="p-8 text-center text-[#2E4033]/40 text-sm">Aucune demande pour le moment.</div>
        ) : (
          <div className="divide-y divide-[#E6DFD3]">
            {quotes.slice(0, 5).map(q => (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                <div>
                  <div className="font-medium text-[#2E4033] text-sm">{q.customer?.name || 'Client'}</div>
                  <div className="text-xs text-[#2E4033]/50">{q.customer?.email || ''} · {q.customer?.country || ''}</div>
                  <div className="text-xs text-[#2E4033]/40 mt-0.5">{q.items?.length || 0} article(s) · ~{q.totalEstimate?.toLocaleString() || 0} Ar</div>
                </div>
                <StatusBadge status={q.status || 'nouveau'} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E6DFD3] flex items-center justify-between">
          <h3 className="font-semibold text-[#2E4033]">Produits mis en avant</h3>
          {loading && <span className="text-xs text-[#2E4033]/40">Chargement...</span>}
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#2E4033]/40 text-sm">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-[#C97A53] border-t-transparent" />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="p-8 text-center text-[#2E4033]/40 text-sm">
            Aucun produit mis en avant pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {featuredProducts.map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#E6DFD3] transition-colors">
                <img
                  src={p.image}
                  alt={p.name_fr || p.name || 'Produit'}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#2E4033] leading-tight truncate">
                    {p.name_fr || p.name || 'Sans nom'}
                  </div>
                  <div className="text-xs text-[#C97A53] font-semibold mt-0.5">
                    {(p.price || 0).toLocaleString()} Ar
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Products tab
const ProductsTab: React.FC = () => {
  const [prods, setProds] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [categoryAddSuccess, setCategoryAddSuccess] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    materials: '',
    price: '',
    image: '',
    category: 'sacs',
    inStock: true,
    featured: false,
    badge: '',
  });

  const loadProducts = async () => {
    try {
      const items = await getAllProducts();
      setProds(items || []);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setProds([]);
    }
  };

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name_fr, slug, sort_order')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setCategories(data.map((cat: any) => ({ id: cat.id, name: cat.name_fr })));
      } else {
        setCategories([
          { id: 'sacs', name: 'sacs' },
          { id: 'chapeaux', name: 'chapeaux' },
          { id: 'pochettes', name: 'pochettes' },
          { id: 'decoration', name: 'decoration' },
          { id: 'accessoires', name: 'accessoires' }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      setCategories([
        { id: 'sacs', name: 'sacs' },
        { id: 'chapeaux', name: 'chapeaux' },
        { id: 'pochettes', name: 'pochettes' },
        { id: 'decoration', name: 'decoration' },
        { id: 'accessoires', name: 'accessoires' }
      ]);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const filteredProducts = prods.filter(p =>
    p.name?.fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setAddingCategory(true);
      setCategoryAddSuccess(false);

      if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
        alert('Cette catégorie existe déjà !');
        setAddingCategory(false);
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .insert({
          name_fr: newCategoryName.trim(),
          name_en: newCategoryName.trim(),
          slug: newCategoryName.trim().toLowerCase().replace(/\s+/g, '-'),
          sort_order: categories.length + 1
        })
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => [...prev, { id: data.id, name: data.name_fr }]);
      setProductForm(prev => ({ ...prev, category: data.name_fr }));
      setNewCategoryName('');
      setShowNewCategoryInput(false);
      setCategoryAddSuccess(true);

      setTimeout(() => setCategoryAddSuccess(false), 3000);

    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
      alert('Erreur lors de l\'ajout de la catégorie. Veuillez réessayer.');
    } finally {
      setAddingCategory(false);
    }
  };

  const handleEditCategory = async (id: string, newName: string) => {
    if (!newName.trim() || newName === categories.find(c => c.id === id)?.name) {
      setEditingCategoryId(null);
      setEditingCategoryName('');
      return;
    }

    try {
      if (categories.some(cat => cat.name.toLowerCase() === newName.trim().toLowerCase() && cat.id !== id)) {
        alert('Une catégorie avec ce nom existe déjà !');
        return;
      }

      const { error } = await supabase
        .from('categories')
        .update({
          name_fr: newName.trim(),
          name_en: newName.trim(),
          slug: newName.trim().toLowerCase().replace(/\s+/g, '-')
        })
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.map(cat =>
        cat.id === id ? { ...cat, name: newName.trim() } : cat
      ));

      if (productForm.category === categories.find(c => c.id === id)?.name) {
        setProductForm(prev => ({ ...prev, category: newName.trim() }));
      }

      setEditingCategoryId(null);
      setEditingCategoryName('');
      await loadProducts();

    } catch (error) {
      console.error('Erreur lors de la modification de la catégorie:', error);
      alert('Erreur lors de la modification de la catégorie.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const category = categories.find(c => c.id === id);
    if (!category) return;

    const productsInCategory = prods.filter(p => p.category === category.name);
    if (productsInCategory.length > 0) {
      if (!window.confirm(`La catégorie "${category.name}" contient ${productsInCategory.length} produit(s). Voulez-vous vraiment la supprimer ? Les produits seront réassignés à "sacs".`)) {
        return;
      }
    } else {
      if (!window.confirm(`Voulez-vous vraiment supprimer la catégorie "${category.name}" ?`)) {
        return;
      }
    }

    try {
      if (productsInCategory.length > 0) {
        for (const product of productsInCategory) {
          await updateProduct(product.id, { ...product, category: 'sacs' });
        }
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCategories(prev => prev.filter(cat => cat.id !== id));

      if (productForm.category === category.name) {
        setProductForm(prev => ({ ...prev, category: 'sacs' }));
      }

      await loadProducts();

    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      alert('Erreur lors de la suppression de la catégorie.');
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    setShowAdd(true);
    setShowNewCategoryInput(false);
    setNewCategoryName('');
    setCategoryAddSuccess(false);
    setEditingCategoryId(null);
    setEditingCategoryName('');
    setProductForm({
      name: '',
      description: '',
      materials: '',
      price: '',
      image: '',
      category: categories.length > 0 ? categories[0].name : 'sacs',
      inStock: true,
      featured: false,
      badge: '',
    });
  };

  const openEditModal = (product: Product) => {
    setEditing(product);
    setShowAdd(true);
    setShowNewCategoryInput(false);
    setNewCategoryName('');
    setCategoryAddSuccess(false);
    setEditingCategoryId(null);
    setEditingCategoryName('');
    setProductForm({
      name: product.name?.fr || '',
      description: product.description?.fr || '',
      materials: product.materials?.fr || '',
      price: String(product.price || ''),
      image: product.image || '',
      category: product.category || 'sacs',
      inStock: product.inStock !== undefined ? product.inStock : true,
      featured: product.featured || false,
      badge: product.badge?.fr || '',
    });
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await uploadProductImage(file);
      if (result) {
        setProductForm(prev => ({ ...prev, image: result }));
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload de l\'image.');
    }
  };

  const handleSave = async () => {
    setSaving(true);

    const payload: Partial<Product> = {
      name: { fr: productForm.name, en: productForm.name },
      description: { fr: productForm.description, en: productForm.description },
      materials: { fr: productForm.materials, en: productForm.materials },
      price: Number(productForm.price) || 0,
      image: productForm.image || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      category: productForm.category,
      inStock: productForm.inStock,
      featured: productForm.featured,
      badge: productForm.badge ? { fr: productForm.badge, en: productForm.badge } : undefined,
    };

    try {
      if (editing) {
        await updateProduct(editing.id, payload);
      } else {
        await createProduct(payload);
      }

      setSaving(false);
      setEditing(null);
      setShowAdd(false);
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      alert('Erreur lors de l\'enregistrement du produit.');
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression du produit.');
      }
    }
  };

  const toggleStock = async (id: string) => {
    const product = prods.find(p => p.id === id);
    if (!product) return;
    try {
      await updateProduct(id, { ...product, inStock: !product.inStock });
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors du changement de stock:', error);
      alert('Erreur lors du changement de stock.');
    }
  };

  const toggleFeatured = async (id: string) => {
    const product = prods.find(p => p.id === id);
    if (!product) return;
    try {
      await updateProduct(id, { ...product, featured: !product.featured });
      await loadProducts();
    } catch (error) {
      console.error('Erreur lors du changement de mise en avant:', error);
      alert('Erreur lors du changement de mise en avant.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <h3 className="font-semibold text-[#2E4033]">{filteredProducts.length} produits</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4033]/30" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full sm:w-48 pl-9 pr-4 py-2 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]"
            />
          </div>
          <button onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#2E4033] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1a2b1f] transition-colors whitespace-nowrap">
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E6DFD3]">
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Produit</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Catégorie</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Prix (Ar)</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Stock</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Mis en avant</th>
                <th className="text-right p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD3]">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name?.fr || 'Produit'} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-medium text-[#2E4033]">{p.name?.fr || 'Sans nom'}</div>
                        <div className="text-xs text-[#2E4033]/40">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize text-[#2E4033]/70">{p.category || 'N/A'}</span>
                  </td>
                  <td className="p-4 font-semibold text-[#C97A53]">{p.price?.toLocaleString() || 0} Ar</td>
                  <td className="p-4">
                    <button onClick={() => toggleStock(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${p.inStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
                      {p.inStock ? '✓ En stock' : '✗ Épuisé'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleFeatured(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${p.featured ? 'bg-[#C97A53]/20 text-[#C97A53] hover:bg-[#C97A53]/30' : 'bg-[#E6DFD3] text-[#2E4033]/40 hover:bg-[#E6DFD3]'}`}>
                      {p.featured ? '★ Oui' : '☆ Non'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEditModal(p)}
                        className="p-1.5 hover:bg-[#E6DFD3] rounded-lg transition-colors">
                        <Pencil size={14} className="text-[#2E4033]" />
                      </button>
                      <button onClick={() => handleDelete(p.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#2E4033]/40">
                    {searchTerm ? 'Aucun produit trouvé pour cette recherche' : 'Aucun produit disponible'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || showAdd) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-[#2E4033]">{editing ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
              <button onClick={() => { setEditing(null); setShowAdd(false); setShowNewCategoryInput(false); setNewCategoryName(''); setEditingCategoryId(null); setEditingCategoryName(''); }} className="p-1 hover:bg-[#E6DFD3] rounded-lg">
                <X size={18} className="text-[#2E4033]" />
              </button>
            </div>
            <div className="space-y-3">
              <input value={productForm.name} onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))} placeholder="Nom du produit" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <textarea value={productForm.description} onChange={e => setProductForm(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" rows={3} className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <textarea value={productForm.materials} onChange={e => setProductForm(prev => ({ ...prev, materials: e.target.value }))} placeholder="Matériaux" rows={2} className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />

              <div>
                <label className="text-xs font-medium text-[#2E4033]/50">Prix en Ariary (Ar)</label>
                <input
                  value={productForm.price}
                  onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  type="number"
                  placeholder="Ex: 25000"
                  className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033] mt-1"
                />
              </div>

              <input value={productForm.image} onChange={e => setProductForm(prev => ({ ...prev, image: e.target.value }))} placeholder="URL Image ou upload" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <input type="file" accept="image/*" onChange={async e => { const file = e.target.files?.[0]; if (file) await handleImageUpload(file); }} className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm text-[#2E4033]" />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <select
                    value={productForm.category}
                    onChange={e => {
                      if (e.target.value === 'add_new') {
                        setShowNewCategoryInput(true);
                        setProductForm(prev => ({ ...prev, category: '' }));
                      } else {
                        setProductForm(prev => ({ ...prev, category: e.target.value }));
                      }
                    }}
                    className="flex-1 px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                      </option>
                    ))}
                    <option value="add_new" className="text-[#C97A53] font-semibold">
                      ➕ Ajouter une nouvelle catégorie
                    </option>
                  </select>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const selectedCat = categories.find(c => c.name === productForm.category);
                        if (selectedCat) {
                          setEditingCategoryId(selectedCat.id);
                          setEditingCategoryName(selectedCat.name);
                        }
                      }}
                      className="p-2.5 border border-[#E6DFD3] rounded-xl text-[#2E4033] hover:bg-[#E6DFD3] transition-colors"
                      title="Modifier la catégorie"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const selectedCat = categories.find(c => c.name === productForm.category);
                        if (selectedCat) {
                          handleDeleteCategory(selectedCat.id);
                        }
                      }}
                      className="p-2.5 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      title="Supprimer la catégorie"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {editingCategoryId && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingCategoryName}
                      onChange={e => setEditingCategoryName(e.target.value)}
                      placeholder="Nouveau nom de la catégorie"
                      className="flex-1 px-3 py-2.5 border-2 border-[#2E4033] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleEditCategory(editingCategoryId, editingCategoryName)}
                      className="px-4 py-2.5 bg-[#2E4033] text-white rounded-xl text-sm font-semibold hover:bg-[#1a2b1f] transition-colors flex items-center gap-1"
                    >
                      <Save size={14} /> Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategoryId(null);
                        setEditingCategoryName('');
                      }}
                      className="p-2.5 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {showNewCategoryInput && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={e => setNewCategoryName(e.target.value)}
                      placeholder="Nom de la nouvelle catégorie"
                      className="flex-1 px-3 py-2.5 border-2 border-[#C97A53] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      disabled={!newCategoryName.trim() || addingCategory}
                      className="px-4 py-2.5 bg-[#C97A53] text-white rounded-xl text-sm font-semibold hover:bg-[#a8623e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {addingCategory ? (
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Plus size={16} /> Ajouter
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategoryInput(false);
                        setNewCategoryName('');
                      }}
                      className="p-2.5 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {categoryAddSuccess && (
                  <div className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg flex items-center gap-2">
                    <Check size={14} />
                    Catégorie ajoutée avec succès !
                  </div>
                )}
              </div>

              <input value={productForm.badge} onChange={e => setProductForm(prev => ({ ...prev, badge: e.target.value }))} placeholder="Badge (ex: Nouveau, Épuisé...)" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />

              <label className="flex items-center gap-2 text-sm text-[#2E4033]">
                <input type="checkbox" checked={productForm.inStock} onChange={e => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))} />
                En stock
              </label>
              <label className="flex items-center gap-2 text-sm text-[#2E4033]">
                <input type="checkbox" checked={productForm.featured} onChange={e => setProductForm(prev => ({ ...prev, featured: e.target.checked }))} />
                Produit mis en avant
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => { setEditing(null); setShowAdd(false); setShowNewCategoryInput(false); setNewCategoryName(''); setEditingCategoryId(null); setEditingCategoryName(''); }}
                className="flex-1 py-2.5 border border-[#E6DFD3] rounded-xl text-sm font-medium text-[#2E4033] hover:bg-[#E6DFD3] transition-colors">
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-[#2E4033] text-white rounded-xl text-sm font-medium hover:bg-[#1a2b1f] transition-colors flex items-center justify-center gap-1 disabled:opacity-50">
                <Save size={14} /> {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Quotes tab - Sans bouton de suppression
const QuotesTab: React.FC<{
  quotes: QuoteRequest[];
  updateStatus: (id: string, status: string) => void;
}> = ({ quotes, updateStatus }) => {
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = quotes.filter(q =>
    q.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4033]/30" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom, email ou ID..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]"
        />
      </div>

      {selected ? (
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-[#E6DFD3] flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="p-2 hover:bg-[#E6DFD3] rounded-lg transition-colors">
              <X size={16} className="text-[#2E4033]" />
            </button>
            <h3 className="font-semibold text-[#2E4033]">Demande #{selected.id}</h3>
            <StatusBadge status={selected.status || 'nouveau'} />
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#2E4033] mb-3 text-sm uppercase tracking-widest">Client</h4>
              <div className="space-y-2 text-sm text-[#2E4033]/70">
                <div><span className="font-medium text-[#2E4033]">Nom :</span> {selected.customer?.name || 'N/A'}</div>
                <div><span className="font-medium text-[#2E4033]">Email :</span> {selected.customer?.email || 'N/A'}</div>
                {selected.customer?.phone && <div><span className="font-medium text-[#2E4033]">Tél :</span> {selected.customer.phone}</div>}
                <div><span className="font-medium text-[#2E4033]">Pays :</span> {selected.customer?.country || 'N/A'}</div>
                <div><span className="font-medium text-[#2E4033]">Profil :</span> {selected.customer?.profile === 'grossiste' ? 'Grossiste B2B' : 'Particulier'}</div>
                {selected.customer?.message && <div><span className="font-medium text-[#2E4033]">Message :</span> {selected.customer.message}</div>}
                <div><span className="font-medium text-[#2E4033]">Date :</span> {selected.createdAt ? new Date(selected.createdAt).toLocaleString('fr-FR') : 'N/A'}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2E4033] mb-3 text-sm uppercase tracking-widest">Articles sélectionnés</h4>
              <div className="space-y-2">
                {selected.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-[#FAF7F2] rounded-xl">
                    <img src={item.product?.image || ''} alt={item.product?.name?.fr || ''} className="w-10 h-10 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#2E4033]">{item.product?.name?.fr || 'Produit'}</div>
                      <div className="text-xs text-[#2E4033]/50">×{item.quantity || 0} · {((item.product?.price || 0) * (item.quantity || 0)).toLocaleString()} Ar</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-sm p-2 border-t border-[#E6DFD3]">
                  <span>Total estimé</span>
                  <span className="text-[#C97A53]">~{selected.totalEstimate?.toLocaleString() || 0} Ar</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#E6DFD3] flex flex-wrap gap-2">
            {['nouveau', 'en_cours', 'traite', 'archive'].map(s => (
              <button key={s}
                onClick={() => { updateStatus(selected.id, s); setSelected({ ...selected, status: s }); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selected.status === s ? 'bg-[#2E4033] text-white' : 'bg-[#E6DFD3] text-[#2E4033] hover:bg-[#d4cfc8]'}`}>
                {s === 'nouveau' ? 'Nouveau' : s === 'en_cours' ? 'En cours' : s === 'traite' ? 'Traité' : 'Archiver'}
              </button>
            ))}
            <a href={`mailto:${selected.customer?.email || ''}?subject=Votre demande de devis Nature Raphia - ${selected.id}`}
              className="ml-auto px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C97A53] text-white hover:bg-[#a8623e] transition-colors">
              Répondre par email
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#E6DFD3] flex items-center justify-between">
            <h3 className="font-semibold text-[#2E4033]">Toutes les demandes ({filteredQuotes.length})</h3>
            {searchTerm && <span className="text-xs text-[#2E4033]/40">{quotes.length} total</span>}
          </div>
          {filteredQuotes.length === 0 ? (
            <div className="p-12 text-center text-[#2E4033]/40">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">{searchTerm ? 'Aucun résultat pour cette recherche' : 'Aucune demande de devis pour le moment.'}</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E6DFD3]">
              {filteredQuotes.map(q => (
                <div key={q.id} className="p-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer" onClick={() => setSelected(q)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#2E4033] text-sm">{q.customer?.name || 'Client'}</span>
                        <span className="text-xs text-[#2E4033]/40">{q.id}</span>
                      </div>
                      <div className="text-xs text-[#2E4033]/60">{q.customer?.email || ''} · {q.customer?.country || ''} · {q.customer?.profile === 'grossiste' ? 'B2B' : 'Particulier'}</div>
                      <div className="text-xs text-[#2E4033]/40 mt-1">
                        {q.items?.length || 0} article(s) · ~{q.totalEstimate?.toLocaleString() || 0} Ar · {q.createdAt ? new Date(q.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={q.status || 'nouveau'} />
                      <Eye size={14} className="text-[#2E4033]/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Admin Panel
const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'quotes'>('dashboard');
  const { quotes, updateQuoteStatus } = useCart();

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FAF7F2]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-[#E6DFD3] rounded-full transition-colors">
          <X size={20} className="text-[#2E4033]" />
        </button>
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'products', icon: Package, label: 'Produits' },
    { id: 'quotes', icon: FileText, label: `Devis (${quotes.filter(q => q.status === 'nouveau').length})` },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex">
      <aside className="w-16 md:w-56 bg-[#2E4033] flex flex-col py-6 flex-shrink-0">
        <div className="hidden md:flex items-center gap-2 px-4 mb-8">
          <div className="w-8 h-8 rounded-full bg-[#C97A53] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold font-serif">NR</span>
          </div>
          <div>
            <div className="text-white text-xs font-semibold font-serif leading-tight">Admin</div>
            <div className="text-[#C97A53] text-[10px]">Nature Raphia</div>
          </div>
        </div>
        <div className="md:hidden flex justify-center mb-8">
          <div className="w-8 h-8 rounded-full bg-[#C97A53] flex items-center justify-center">
            <span className="text-white text-xs font-bold font-serif">NR</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-2 md:px-3 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-2 space-y-1">
          <button onClick={onClose}
            className="w-full flex items-center gap-3 px-2 md:px-3 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <X size={18} className="flex-shrink-0" />
            <span className="hidden md:inline">Retour au site</span>
          </button>
          <button onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-2 md:px-3 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors">
            <LogOut size={18} className="flex-shrink-0" />
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E6DFD3] px-6 py-4 flex items-center justify-between z-10">
          <h1 className="font-serif font-semibold text-[#2E4033] text-xl">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#2E4033]/40">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardTab quotes={quotes} />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'quotes' && <QuotesTab quotes={quotes} updateStatus={updateQuoteStatus} />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;