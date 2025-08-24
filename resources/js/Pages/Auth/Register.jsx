import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Heart, Moon, Sun, Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

// Komponen UI yang disesuaikan dengan Laravel Breeze
const Checkbox = ({ name, checked, onChange, className }) => (
    <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={`w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 ${className}`}
    />
);

const InputError = ({ message, className }) => 
    message ? <div className={`text-red-500 text-sm ${className}`}>{message}</div> : null;

const InputLabel = ({ htmlFor, value, className }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
        {value}
    </label>
);

const PrimaryButton = ({ children, className = '', disabled, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
        outline: 'bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50'
    };
    
    return (
        <button
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

const TextInput = ({ id, type, name, value, className = '', onChange, icon: Icon, isFocused, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    React.useEffect(() => {
        if (isFocused) {
            document.getElementById(id)?.focus();
        }
    }, [isFocused, id]);

    return (
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                id={id}
                type={inputType}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${type === 'password' ? 'pr-10' : 'pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm ${className}`}
                {...props}
            />
            {type === 'password' && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                </button>
            )}
        </div>
    );
};

const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = (pass) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const labels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength ? colors[strength - 1] : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs ${strength < 3 ? 'text-red-500' : strength < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                {strength > 0 ? labels[strength - 1] : ''}
            </p>
        </div>
    );
};

export default function Register() {
    // MENGGUNAKAN useForm dari Inertia untuk integrasi dengan Laravel
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [darkMode, setDarkMode] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Animation on mount
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // SUBMIT FUNCTION yang terintegrasi dengan Laravel Breeze
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => {
                // Optional: tambahkan notifikasi success
                console.log('Registration successful!');
            },
            onError: (errors) => {
                // Optional: tambahkan error handling
                console.log('Registration errors:', errors);
            }
        });
    };

    const backgroundClass = darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50';

    const cardClass = darkMode
        ? 'bg-slate-800/90 border-slate-700'
        : 'bg-white/80 border-white/20';

    const textClass = darkMode ? 'text-white' : 'text-gray-900';

    return (
        <>
            <Head title="Register" />
            
            <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 ${backgroundClass} transition-all duration-500`}>
                {/* Animated Background Elements - Responsive */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 group"
                    title="Kembali"
                >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-white group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" />
                </Link>

                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                    title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
                >
                    {darkMode ? (
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    ) : (
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
                    )}
                </button>

                {/* Main Card - Responsive with Animation */}
                <div className={`relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl backdrop-blur-xl ${cardClass} border rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform ${
                    isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                }`}>
                    {/* Header with Islamic Pattern */}
                    <div className={`relative bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-6 sm:px-8 sm:py-8 text-center transition-all duration-700 delay-200 transform ${
                        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                    }`}>
                        <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" viewBox="0 0 200 200" fill="currentColor">
                                <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <polygon points="20,0 40,20 20,40 0,20" fill="currentColor" opacity="0.3"/>
                                </pattern>
                                <rect width="200" height="200" fill="url(#islamicPattern)" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full mb-3 backdrop-blur-sm transition-all duration-700 delay-300 transform ${
                                isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                            }`}>
                                <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                            </div>
                            <h1 className={`text-lg sm:text-xl font-bold text-white mb-1 transition-all duration-700 delay-400 transform ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                            }`}>Zakat Digital</h1>
                            <p className={`text-emerald-100 text-xs sm:text-sm transition-all duration-700 delay-500 transform ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                            }`}>Bergabung dalam kebaikan</p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className={`px-6 py-6 sm:px-8 sm:py-8 transition-all duration-700 delay-300 transform ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        <div className="text-center mb-6">
                            <h2 className={`text-xl sm:text-2xl font-bold ${textClass} mb-2`}>Daftar Akun</h2>
                            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Buat akun untuk mulai berzakat
                            </p>
                        </div>

                        {/* FORM dengan integrasi Laravel Breeze */}
                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        icon={User}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        icon={Mail}
                                        placeholder="Masukkan email"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        icon={Lock}
                                        placeholder="Buat password"
                                    />
                                    <PasswordStrengthIndicator password={data.password} />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        icon={Shield}
                                        placeholder="Konfirmasi password"
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <Link
                                        href={route('login')}
                                        className={`text-sm underline transition-colors duration-200 ${
                                            darkMode 
                                                ? 'text-gray-400 hover:text-gray-200' 
                                                : 'text-gray-600 hover:text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md`}
                                    >
                                        Sudah punya akun?
                                    </Link>

                                    <PrimaryButton 
                                        disabled={processing}
                                        type="submit"
                                        className="ms-4"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent mr-2"></div>
                                                Mendaftarkan...
                                            </div>
                                        ) : (
                                            'Daftar'
                                        )}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>

                        {/* Islamic Quote */}
                        <div className={`mt-6 p-3 sm:p-4 ${darkMode ? 'bg-slate-700/50' : 'bg-emerald-50/50'} rounded-lg border-l-4 border-emerald-500 transition-all duration-700 delay-1200 transform ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                        }`}>
                            <p className={`text-xs italic ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center leading-relaxed`}>
                                "Barangsiapa yang menunjukkan kepada kebaikan, maka dia mendapat pahala seperti orang yang mengerjakannya"
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center mt-1`}>
                                - HR. Muslim
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}