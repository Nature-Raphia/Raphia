import React from 'react';
import Contact from '../components/Contact';
import InstagramFeed from '../components/InstagramFeed';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-16 md:pt-20">
      <Contact />
       <InstagramFeed 
        username="nature.raphia"
        limit={6}
        title="@nature.raphia"
        
      />
    </div>
  );
};

export default ContactPage;