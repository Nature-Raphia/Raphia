import React, { useState } from 'react';
import { X, LayoutDashboard, Package, FileText, LogOut, Eye, Check, Clock, Archive, TrendingUp, ShoppingBag, Users, Plus, Pencil, Trash2, Save, AlertCircle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { products as initialProducts } from '../data/products';
import { Product, QuoteRequest } from '../types';

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
          <div className="w-16 h-16 rounded-full bg-[#2E4033] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold font-serif text-xl">NR</span>
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
const StatusBadge: React.FC<{ status: QuoteRequest['status'] }> = ({ status }) => {
  const config = {
    nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
    en_cours: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
    traite: { label: 'Traité', color: 'bg-green-100 text-green-700' },
    archive: { label: 'Archivé', color: 'bg-gray-100 text-gray-500' },
  };
  const c = config[status];
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.color}`}>{c.label}</span>;
};

// Dashboard tab
const DashboardTab: React.FC<{ quotes: QuoteRequest[] }> = ({ quotes }) => {
  const newQuotes = quotes.filter(q => q.status === 'nouveau').length;
  const totalRevenue = quotes.reduce((sum, q) => sum + (q.totalEstimate || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total demandes" value={quotes.length} color="#2E4033" />
        <StatCard icon={AlertCircle} label="Nouvelles demandes" value={newQuotes} color="#C97A53" sub={newQuotes > 0 ? '🔴 Action requise' : undefined} />
        <StatCard icon={ShoppingBag} label="Produits actifs" value={initialProducts.filter(p => p.inStock).length} color="#2E4033" />
        <StatCard icon={TrendingUp} label="Valeur estimée (€)" value={`~${totalRevenue}`} color="#C97A53" sub="+12% ce mois" />
      </div>

      {/* Recent quotes */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E6DFD3] flex items-center justify-between">
          <h3 className="font-semibold text-[#2E4033]">Dernières demandes</h3>
          <span className="text-xs text-[#2E4033]/40">{quotes.length} total</span>
        </div>
        {quotes.slice(0, 5).length === 0 ? (
          <div className="p-8 text-center text-[#2E4033]/40 text-sm">Aucune demande pour le moment.</div>
        ) : (
          <div className="divide-y divide-[#E6DFD3]">
            {quotes.slice(0, 5).map(q => (
              <div key={q.id} className="p-4 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors">
                <div>
                  <div className="font-medium text-[#2E4033] text-sm">{q.customer.name}</div>
                  <div className="text-xs text-[#2E4033]/50">{q.customer.email} · {q.customer.country}</div>
                  <div className="text-xs text-[#2E4033]/40 mt-0.5">{q.items.length} article(s) · ~{q.totalEstimate}€</div>
                </div>
                <StatusBadge status={q.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top products */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E6DFD3]">
          <h3 className="font-semibold text-[#2E4033]">Produits mis en avant</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {initialProducts.filter(p => p.featured).slice(0, 3).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F2]">
              <img src={p.image} alt={p.name.fr} className="w-12 h-12 object-cover rounded-lg" />
              <div>
                <div className="text-xs font-medium text-[#2E4033] leading-tight">{p.name.fr}</div>
                <div className="text-xs text-[#C97A53] font-semibold mt-0.5">{p.price} €</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quotes tab
const QuotesTab: React.FC<{ quotes: QuoteRequest[]; updateStatus: (id: string, status: QuoteRequest['status']) => void }> = ({ quotes, updateStatus }) => {
  const [selected, setSelected] = useState<QuoteRequest | null>(null);

  return (
    <div className="space-y-4">
      {selected ? (
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-[#E6DFD3] flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="p-2 hover:bg-[#E6DFD3] rounded-lg transition-colors">
              <X size={16} className="text-[#2E4033]" />
            </button>
            <h3 className="font-semibold text-[#2E4033]">Demande #{selected.id}</h3>
            <StatusBadge status={selected.status} />
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#2E4033] mb-3 text-sm uppercase tracking-widest">Client</h4>
              <div className="space-y-2 text-sm text-[#2E4033]/70">
                <div><span className="font-medium text-[#2E4033]">Nom :</span> {selected.customer.name}</div>
                <div><span className="font-medium text-[#2E4033]">Email :</span> {selected.customer.email}</div>
                {selected.customer.phone && <div><span className="font-medium text-[#2E4033]">Tél :</span> {selected.customer.phone}</div>}
                <div><span className="font-medium text-[#2E4033]">Pays :</span> {selected.customer.country}</div>
                <div><span className="font-medium text-[#2E4033]">Profil :</span> {selected.customer.profile === 'grossiste' ? 'Grossiste B2B' : 'Particulier'}</div>
                {selected.customer.message && <div><span className="font-medium text-[#2E4033]">Message :</span> {selected.customer.message}</div>}
                <div><span className="font-medium text-[#2E4033]">Date :</span> {new Date(selected.createdAt).toLocaleString('fr-FR')}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#2E4033] mb-3 text-sm uppercase tracking-widest">Articles sélectionnés</h4>
              <div className="space-y-2">
                {selected.items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3 p-2 bg-[#FAF7F2] rounded-xl">
                    <img src={item.product.image} alt={item.product.name.fr} className="w-10 h-10 object-cover rounded-lg" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#2E4033]">{item.product.name.fr}</div>
                      <div className="text-xs text-[#2E4033]/50">×{item.quantity} · {item.product.price * item.quantity}€</div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-sm p-2 border-t border-[#E6DFD3]">
                  <span>Total estimé</span>
                  <span className="text-[#C97A53]">~{selected.totalEstimate}€</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#E6DFD3] flex flex-wrap gap-2">
            {(['nouveau', 'en_cours', 'traite', 'archive'] as QuoteRequest['status'][]).map(s => (
              <button key={s} onClick={() => { updateStatus(selected.id, s); setSelected({ ...selected, status: s }); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${selected.status === s ? 'bg-[#2E4033] text-white' : 'bg-[#E6DFD3] text-[#2E4033] hover:bg-[#d4cfc8]'}`}>
                {s === 'nouveau' ? 'Nouveau' : s === 'en_cours' ? 'En cours' : s === 'traite' ? 'Traité' : 'Archiver'}
              </button>
            ))}
            <a href={`mailto:${selected.customer.email}?subject=Votre demande de devis Nature Raphia - ${selected.id}`}
              className="ml-auto px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C97A53] text-white hover:bg-[#a8623e] transition-colors">
              Répondre par email
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#E6DFD3]">
            <h3 className="font-semibold text-[#2E4033]">Toutes les demandes ({quotes.length})</h3>
          </div>
          {quotes.length === 0 ? (
            <div className="p-12 text-center text-[#2E4033]/40">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucune demande de devis pour le moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E6DFD3]">
              {quotes.map(q => (
                <div key={q.id} className="p-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer" onClick={() => setSelected(q)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#2E4033] text-sm">{q.customer.name}</span>
                        <span className="text-xs text-[#2E4033]/40">{q.id}</span>
                      </div>
                      <div className="text-xs text-[#2E4033]/60">{q.customer.email} · {q.customer.country} · {q.customer.profile === 'grossiste' ? 'B2B' : 'Particulier'}</div>
                      <div className="text-xs text-[#2E4033]/40 mt-1">
                        {q.items.length} article(s) · ~{q.totalEstimate}€ · {new Date(q.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={q.status} />
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

// Products tab
const ProductsTab: React.FC = () => {
  const [prods, setProds] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const toggleStock = (id: string) => {
    setProds(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const toggleFeatured = (id: string) => {
    setProds(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#2E4033]">{prods.length} produits</h3>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#2E4033] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1a2b1f] transition-colors">
          <Plus size={14} /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E6DFD3]">
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Produit</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Catégorie</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Prix</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Stock</th>
                <th className="text-left p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Mis en avant</th>
                <th className="text-right p-4 text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD3]">
              {prods.map(p => (
                <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name.fr} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-medium text-[#2E4033]">{p.name.fr}</div>
                        <div className="text-xs text-[#2E4033]/40">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize text-[#2E4033]/70">{p.category}</span>
                  </td>
                  <td className="p-4 font-semibold text-[#C97A53]">{p.price} €</td>
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
                      <button onClick={() => setEditing(p)}
                        className="p-1.5 hover:bg-[#E6DFD3] rounded-lg transition-colors">
                        <Pencil size={14} className="text-[#2E4033]" />
                      </button>
                      <button onClick={() => setProds(prev => prev.filter(x => x.id !== p.id))}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add modal placeholder */}
      {(editing || showAdd) && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-[#2E4033]">{editing ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
              <button onClick={() => { setEditing(null); setShowAdd(false); }} className="p-1 hover:bg-[#E6DFD3] rounded-lg">
                <X size={18} className="text-[#2E4033]" />
              </button>
            </div>
            <div className="space-y-3">
              <input defaultValue={editing?.name.fr} placeholder="Nom (FR)" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <input defaultValue={editing?.name.en} placeholder="Nom (EN)" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <input defaultValue={editing?.price} type="number" placeholder="Prix (€)" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <input defaultValue={editing?.image} placeholder="URL Image" className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]" />
              <select defaultValue={editing?.category} className="w-full px-3 py-2.5 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#2E4033] text-[#2E4033]">
                <option value="sacs">Sacs</option>
                <option value="chapeaux">Chapeaux</option>
                <option value="pochettes">Pochettes</option>
                <option value="decoration">Décoration</option>
              </select>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => { setEditing(null); setShowAdd(false); }}
                className="flex-1 py-2.5 border border-[#E6DFD3] rounded-xl text-sm font-medium text-[#2E4033] hover:bg-[#E6DFD3] transition-colors">
                Annuler
              </button>
              <button onClick={() => { setEditing(null); setShowAdd(false); }}
                className="flex-1 py-2.5 bg-[#2E4033] text-white rounded-xl text-sm font-medium hover:bg-[#1a2b1f] transition-colors flex items-center justify-center gap-1">
                <Save size={14} /> Enregistrer
              </button>
            </div>
          </div>
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
      {/* Sidebar */}
      <aside className="w-16 md:w-56 bg-[#2E4033] flex flex-col py-6 flex-shrink-0">
        {/* Logo */}
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

        {/* Nav */}
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

        {/* Bottom actions */}
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E6DFD3] px-6 py-4 flex items-center justify-between z-10">
          <h1 className="font-serif font-semibold text-[#2E4033] text-xl">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#2E4033]/40">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Content */}
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
