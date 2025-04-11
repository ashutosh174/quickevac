import '../styling/Resources_Gallery.css';
import checklistImg from '../assets/images/pic-1.webp';
import safetyKitImg from '../assets/images/pic-2.webp';
import mapsImg from '../assets/images/pic-3.webp';
import disasterImg from '../assets/images/pic-4.webp';
import communityImg from '../assets/images/pic-5.webp';
import communicationImg from '../assets/images/pic-6.webp';

type Resource = {
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

const resources: Resource[] = [
  { title: 'Emergency Checklist', subtitle: 'Preparation Tools', image: checklistImg, link: '#checklist' },
  { title: 'Safety Kits', subtitle: 'Emergency Supplies', image: safetyKitImg, link: '#kits' },
  { title: 'Evacuation Maps', subtitle: 'Navigation', image: mapsImg, link: '#maps' },
  { title: 'Disaster Response Plans', subtitle: 'Planning Guides', image: disasterImg, link: '#response' },
  { title: 'Community Support Resources', subtitle: 'Support Networks', image: communityImg, link: '#support' },
  { title: 'Communication Devices', subtitle: 'Emergency Tech', image: communicationImg, link: '#devices' },
];

const ResourceGallery = () => {
  return (
    <section id="resource-gallery-section" className="resource-gallery-section py-5">
      <div className="container text-center">
        <h2 className="section-title mb-3">Essential Evacuation Resources</h2>
        <p className="section-subtitle">Browse through key tools and information to prepare for emergencies and ensure safety during evacuations.</p>
        <div className="row mt-4 g-4">
          {resources.map((res, idx) => (
            <div className="col-sm-6 col-md-4" key={idx}>
              <a href={res.link} className="resource-card" style={{ backgroundImage: `url(${res.image})` }}>
                <div className="overlay">
                  <h5>{res.title}</h5>
                  <p>{res.subtitle}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ResourceGallery;
