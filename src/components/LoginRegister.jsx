import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ChefHat, Heart } from 'lucide-react';

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.password) {
      onLogin(formData.fullName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
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
              className="bg-white/50 border-pink-200 focus:border-pink-400 focus:ring-pink-200"
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
              className="bg-white/50 border-pink-200 focus:border-pink-400 focus:ring-pink-200"
              placeholder={isLogin ? "Ingresa tu contraseña" : "Crea una contraseña"}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="w-4 h-4 mr-2" />
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
        </form>

        <Separator className="my-6 bg-pink-100" />

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
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