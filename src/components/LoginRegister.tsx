import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ChefHat, Heart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface LoginRegisterProps {
  onLogin: (fullName: string) => void;
  theme: 'feminine' | 'masculine';
  onThemeChange: (theme: 'feminine' | 'masculine') => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ onLogin, theme, onThemeChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.password) {
      onLogin(formData.fullName);
    }
  };

  const gradientClasses = theme === 'feminine' 
    ? 'bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50'
    : 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50';

  const logoGradientClasses = theme === 'feminine'
    ? 'bg-gradient-to-r from-pink-500 to-rose-500'
    : 'bg-gradient-to-r from-sky-500 to-blue-500';

  const titleGradientClasses = theme === 'feminine'
    ? 'bg-gradient-to-r from-pink-600 to-rose-600'
    : 'bg-gradient-to-r from-sky-600 to-blue-600';

  const buttonGradientClasses = theme === 'feminine'
    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
    : 'bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600';

  const borderClasses = theme === 'feminine'
    ? 'border-pink-200 focus:border-pink-400 focus:ring-pink-200'
    : 'border-sky-200 focus:border-sky-400 focus:ring-sky-200';

  const linkClasses = theme === 'feminine'
    ? 'text-pink-600 hover:text-pink-700'
    : 'text-sky-600 hover:text-sky-700';

  return (
    <div className={`min-h-screen ${gradientClasses} flex items-center justify-center p-4 relative`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>

      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`${logoGradientClasses} p-3 rounded-full`}>
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`mb-2 ${titleGradientClasses} bg-clip-text text-transparent`}>
            CocinaAI
          </h1>
          <p className="text-gray-600">Tu asistente personal de cocina</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700">
              Nombre Completo
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`bg-white/50 ${borderClasses}`}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-white/50 ${borderClasses}`}
              placeholder={isLogin ? "Ingresa tu contraseña" : "Crea una contraseña"}
              required
            />
          </div>

          <Button 
            type="submit" 
            className={`w-full ${buttonGradientClasses} text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105`}
          >
            <Heart className="w-4 h-4 mr-2" />
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
        </form>

        <Separator className={`my-6 ${theme === 'feminine' ? 'bg-pink-100' : 'bg-sky-100'}`} />

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={`${linkClasses} transition-colors duration-200`}
          >
            {isLogin 
              ? '¿No tienes cuenta? Regístrate aquí' 
              : '¿Ya tienes cuenta? Inicia sesión'
            }
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegister;