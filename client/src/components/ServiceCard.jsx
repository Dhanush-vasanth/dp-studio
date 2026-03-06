import { getAssetUrl } from '../services/api';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card overflow-hidden">
      <img 
        src={getAssetUrl(service.image)} 
        alt={service.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <button className="btn-primary">Learn More</button>
      </div>
    </div>
  );
};

export default ServiceCard;
