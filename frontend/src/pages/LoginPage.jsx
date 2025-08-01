import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader, LogOut } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, login, logout, loading } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, navigate);
  };

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black min-h-screen'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-pink-500'>
          {user ? "Welcome back!" : "Sign in to your account"}
        </h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-900 py-8 px-6 shadow sm:rounded-lg sm:px-10'>
          {user ? (
            <button
              onClick={handleLogout}
              className='w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-pink-600
                hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-pink-500 transition duration-150 ease-in-out'
            >
              <LogOut className='mr-2 h-5 w-5' />
              Logout
            </button>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                  Email address
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </div>
                  <input
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-700 
                      rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none 
                      focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
                    placeholder='you@example.com'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                  Password
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </div>
                  <input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-700 
                      rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none 
                      focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
                    placeholder='••••••••'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white bg-pink-600
                  hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-pink-500 transition duration-150 ease-in-out disabled:opacity-50'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                    Loading...
                  </>
                ) : (
                  <>
                    <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                    Login
                  </>
                )}
              </button>
            </form>
          )}

          {!user && (
            <p className='mt-8 text-center text-sm text-gray-400'>
              Not a member?{" "}
              <Link to='/signup' className='font-medium text-pink-400 hover:text-pink-300'>
                Sign up now <ArrowRight className='inline h-4 w-4' />
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
