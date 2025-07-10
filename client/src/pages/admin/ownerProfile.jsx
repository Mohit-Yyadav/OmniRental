// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OwnerProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/owners/${userId}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="container mt-4">
//       <h3>My Profile</h3>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Phone:</strong> {profile.phone}</p>
//       <p><strong>Address:</strong> {profile.address}</p>
//       <p><strong>Bio:</strong> {profile.bio}</p>
//       {profile.profileImage && (
//         <img
//           src={`http://localhost:5000/uploads/${profile.profileImage}`}
//           alt="Profile"
//           style={{ width: "150px", height: "150px", objectFit: "cover" }}
//         />
//       )}
//     </div>
//   );
// };

// export default OwnerProfile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/owner/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-4">Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>
      <div className="row">
        <div className="col-md-4">
          {profile.profileImage ? (
            <img
              src={`http://localhost:5000/uploads/${profile.profileImage}`}
              alt="Profile"
              className="img-fluid rounded shadow"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          ) : (
            <p>No profile image</p>
          )}
        </div>
        <div className="col-md-8">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
