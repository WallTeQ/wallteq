import { Home, LogOut, Satellite } from 'lucide-react';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';


const InvalidRole: React.FC = () => {
    const { logout, role } = useAuth()    

    return (
        <section className="bg-white dark:bg-gray-900 h-screen flex justify-center">
            <div className="py-8 px-4 m-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                {/* Alert Banner */}
                <div
                    className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    role="alert"
                >
                    <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3"><Satellite /></span>
                    <span className="text-sm font-medium mr-4">Unknown user role</span>
                </div>

                {/* Title and Description */}
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Oops! Authorization failed.
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Your account has been setup with an invalid role <b>"{role}"</b>. Contact your IT officer/support to have this issue resolved.
                </p>

                {/* Buttons */}
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a
                    href="tel:+233241232321"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-700 dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                        <Home className='mr-2' />
                        Contact Support
                    </a>
                    <button
                        onClick={() => logout()}
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        <LogOut className='mr-2' />
                        Logout
                    </button>
                </div>
            </div>
        </section>
    );
};

export default InvalidRole;
