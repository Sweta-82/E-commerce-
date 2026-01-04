import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('./images/profile.png');

  const { name, email, password } = user;
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill out all the required fields', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success('Registration Successful', {
        position: 'top-center',
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate('/login');
    }
  }, [dispatch, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white shadow-2xl border border-gray-100 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-black mb-8 uppercase tracking-wider">Sign Up</h2>
        <form onSubmit={registerSubmit} encType="multipart/form-data" className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Username</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={registerDataChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={registerDataChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={registerDataChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-all text-sm text-gray-500"
              />
            </div>
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-12 h-12 rounded-full object-cover border border-gray-300 mt-6"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              text={loading ? 'SIGNING UP...' : 'SIGN UP'}
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 font-bold uppercase tracking-widest"
            />
          </div>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-bold hover:underline ml-1">
              SIGN IN HERE
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
