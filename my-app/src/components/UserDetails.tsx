import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import User from './common/User';
import './../style/UserDetails.css';

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <h2 className="user-name">{user.name}</h2>
      <p className="user-username">{`Username: ${user.username}`}</p>
      <p className="user-email">{`Email: ${user.email}`}</p>
      <p className="user-address">
        {`Address: ${user.address?.street}, ${user.address?.suite}, ${user.address?.city}, ${user.address?.zipcode}`}
      </p>
      <p className="user-geo">
        {`Geo: Latitude ${user.address?.geo?.lat}, Longitude ${user.address?.geo?.lng}`}
      </p>
      <p className="user-phone">{`Phone: ${user.phone}`}</p>
      <p className="user-website">{`Website: ${user.website}`}</p>
      <p className="user-company">
        {`Company: ${user.company?.name}, Catchphrase: ${user.company?.catchPhrase}, BS: ${user.company?.bs}`}
      </p>
    </div>
  );
};

export default UserDetails;
