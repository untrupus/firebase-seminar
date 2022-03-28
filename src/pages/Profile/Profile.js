import React, {useState} from 'react';
import {getAuth, updateProfile, updateEmail, deleteUser} from "firebase/auth";
import noImage from '../../assets/no-image.png';
import {EditOutlined} from "@ant-design/icons";
import {logout, storage} from "../../firebase";
import './style.css';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Profile = () => {
  const auth = getAuth();
  console.log(auth.currentUser);
  const user = auth.currentUser;
  const [file, setFile] = useState(null);

  const [nameVisible, setNameVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);

  const [name, setName] = useState(user.displayName ? user.displayName : '');
  const [email, setEmail] = useState(user.email);

  const changeName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log('success');
      setNameVisible(false);
    }).catch((error) => {
      console.log(error);
    });
  };

  const changeEmail = () => {
    updateEmail(auth.currentUser, email).then(() => {
      console.log('success');
      logout();
    }).catch((error) => {
      console.log(error);
    });
  };

  const deleteAccount = () => {
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      console.log(error);
    });
  };

  const uploadFile = (file) => {
    const storageRef = ref(storage, `/avatars/${file.name}`);
    const loading = uploadBytesResumable(storageRef, file);
    loading.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (e) => console.log(e),
      () => {
        getDownloadURL(loading.snapshot.ref)
          .then((url) => {
            updateProfile(auth.currentUser, {
              photoURL: url,
            }).then(() => {
              console.log('success');
              setNameVisible(false);
            }).catch((error) => {
              console.log(error);
            });
          })
          .then(() => {
            setFile(null)
          });
      }
    );
  };

  return (
    <div className='container'>
      <div className="profile">
        <img src={user.photoURL ? user.photoURL : noImage} alt="" className='profileImage'/>
        <div className="profileItem">
          <h3>Display Name:</h3>
          {!nameVisible && <p>{user.displayName ? user.displayName : 'Unknown'}</p>}
          {!nameVisible && <EditOutlined className='editIcon' onClick={() => setNameVisible(true)}/> }
          {nameVisible && <div className='changeForm'>
              <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
              <button onClick={() => setNameVisible(false)}>cancel</button>
              <button onClick={() => changeName()}>submit</button>
            </div>}
        </div>
        <div className="profileItem">
          <h3>Email:</h3>
          {!emailVisible && <p>{user.email}</p>}
          {!emailVisible && <EditOutlined className='editIcon' onClick={() => setEmailVisible(true)}/> }
          {emailVisible && <div className='changeForm'>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => setEmailVisible(false)}>cancel</button>
            <button onClick={() => changeEmail()}>submit</button>
          </div>}
        </div>
        <div className="profileItem">
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          <button onClick={() => uploadFile(file)}>Change Photo</button>
        </div>
        <button className='deleteBtn' onClick={() => deleteAccount()}>delete user</button>
      </div>
    </div>
  );
};

export default Profile;
