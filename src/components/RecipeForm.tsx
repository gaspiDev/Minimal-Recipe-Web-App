import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ChefHat, Clock, Users, Utensils, Plus, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface FormData {
  mealType: string;
  cookingTime: string;
  servings: string;
  dietaryRestrictions: string[];
  cuisineType: string;
  ingredients: string;
  difficulty: string;
  occasion: string;
}

interface UserInfo {
  name: string;
}

interface RecipeFormProps {
  onGenerateRecipe: (formData: FormData) => void;
  userInfo: UserInfo;
  onLogout: () => void;
  isGenerating?: boolean;
  theme: 'feminine' | 'masculine';
  onThemeChange: (theme: 'feminine' | 'masculine') => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onGenerateRecipe, userInfo, onLogout, isGenerating, theme, onThemeChange }) => {
  const [formData, setFormData] = useState<FormData>({
    mealType: '',
    cookingTime: '',
    servings: '',
    dietaryRestrictions: [],
    cuisineType: '',
    ingredients: '',
    difficulty: '',
    occasion: ''
  });

  const [customRestriction, setCustomRestriction] = useState('');

  const dietaryOptions = [
    'Vegetariano', 'Vegano', 'Sin Gluten', 'Sin Lactosa', 
    'Keto', 'Paleo', 'Sin Azúcar', 'Diabético'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addDietaryRestriction = (restriction: string) => {
    if (!formData.dietaryRestrictions.includes(restriction)) {
      setFormData({
        ...formData,
        dietaryRestrictions: [...formData.dietaryRestrictions, restriction]
      });
    }
  };

  const removeDietaryRestriction = (restriction: string) => {
    setFormData({
      ...formData,
      dietaryRestrictions: formData.dietaryRestrictions.filter(r => r !== restriction)
    });
  };

  const addCustomRestriction = () => {
    if (customRestriction.trim() && !formData.dietaryRestrictions.includes(customRestriction.trim())) {
      addDietaryRestriction(customRestriction.trim());
      setCustomRestriction('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateRecipe(formData);
  };

  const getThemeClasses = () => {
    if (theme === 'feminine') {
      return {
        background: 'bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50',
        logoGradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
        titleGradient: 'bg-gradient-to-r from-pink-600 to-rose-600',
        buttonGradient: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
        borders: 'border-pink-200 focus:border-pink-400',
        iconColor: 'text-pink-500',
        badgeActive: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
        badgeInactive: 'border-pink-200 text-pink-600 hover:bg-pink-50',
        logoutButton: 'border-pink-200 text-pink-600 hover:bg-pink-50',
        separator: 'bg-pink-100',
        addButton: 'bg-pink-500 hover:bg-pink-600'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50',
        logoGradient: 'bg-gradient-to-r from-sky-500 to-blue-500',
        titleGradient: 'bg-gradient-to-r from-sky-600 to-blue-600',
        buttonGradient: 'bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600',
        borders: 'border-sky-200 focus:border-sky-400',
        iconColor: 'text-sky-500',
        badgeActive: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white',
        badgeInactive: 'border-sky-200 text-sky-600 hover:bg-sky-50',
        logoutButton: 'border-sky-200 text-sky-600 hover:bg-sky-50',
        separator: 'bg-sky-100',
        addButton: 'bg-sky-500 hover:bg-sky-600'
      };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.background} p-4 relative`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className={`${themeClasses.logoGradient} p-2 rounded-full`}>
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`${themeClasses.titleGradient} bg-clip-text text-transparent`}>
                ¡Hola, {userInfo.name}!
              </h1>
              <p className="text-gray-600">Cuéntanos qué te gustaría cocinar</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className={themeClasses.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </div>

        <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Comida */}
            <div className="space-y-2">
              <Label className="text-gray-700 flex items-center">
                <Utensils className={`w-4 h-4 mr-2 ${themeClasses.iconColor}`} />
                Tipo de Comida
              </Label>
              <Select onValueChange={(value) => handleSelectChange('mealType', value)}>
                <SelectTrigger className={`bg-white/50 ${themeClasses.borders}`}>
                  <SelectValue placeholder="Selecciona el tipo de comida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desayuno">Desayuno</SelectItem>
                  <SelectItem value="almuerzo">Almuerzo</SelectItem>
                  <SelectItem value="cena">Cena</SelectItem>
                  <SelectItem value="merienda">Merienda</SelectItem>
                  <SelectItem value="postre">Postre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tiempo de Preparación y Porciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center">
                  <Clock className={`w-4 h-4 mr-2 ${themeClasses.iconColor}`} />
                  Tiempo de Preparación
                </Label>
                <Select onValueChange={(value) => handleSelectChange('cookingTime', value)}>
                  <SelectTrigger className={`bg-white/50 ${themeClasses.borders}`}>
                    <SelectValue placeholder="Tiempo disponible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1.5 horas</SelectItem>
                    <SelectItem value="120">2+ horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center">
                  <Users className={`w-4 h-4 mr-2 ${themeClasses.iconColor}`} />
                  Número de Porciones
                </Label>
                <Input
                  name="servings"
                  type="number"
                  value={formData.servings}
                  onChange={handleInputChange}
                  className={`bg-white/50 ${themeClasses.borders}`}
                  placeholder="¿Para cuántas personas?"
                  min="1"
                  max="20"
                />
              </div>
            </div>

            {/* Restricciones Dietéticas */}
            <div className="space-y-3">
              <Label className="text-gray-700">Restricciones Dietéticas</Label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={formData.dietaryRestrictions.includes(option) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.dietaryRestrictions.includes(option)
                        ? themeClasses.badgeActive
                        : themeClasses.badgeInactive
                    }`}
                    onClick={() => {
                      if (formData.dietaryRestrictions.includes(option)) {
                        removeDietaryRestriction(option);
                      } else {
                        addDietaryRestriction(option);
                      }
                    }}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
              
              {/* Custom Restriction Input */}
              <div className="flex gap-2">
                <Input
                  value={customRestriction}
                  onChange={(e) => setCustomRestriction(e.target.value)}
                  className={`bg-white/50 ${themeClasses.borders}`}
                  placeholder="Agregar restricción personalizada"
                />
                <Button
                  type="button"
                  onClick={addCustomRestriction}
                  size="sm"
                  className={themeClasses.addButton}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Selected Restrictions */}
              {formData.dietaryRestrictions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.dietaryRestrictions.map((restriction) => (
                    <Badge
                      key={restriction}
                      className={themeClasses.badgeActive}
                    >
                      {restriction}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => removeDietaryRestriction(restriction)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Tipo de Cocina y Dificultad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Tipo de Cocina</Label>
                <Select onValueChange={(value) => handleSelectChange('cuisineType', value)}>
                  <SelectTrigger className={`bg-white/50 ${themeClasses.borders}`}>
                    <SelectValue placeholder="Selecciona el estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mexicana">Mexicana</SelectItem>
                    <SelectItem value="italiana">Italiana</SelectItem>
                    <SelectItem value="asiatica">Asiática</SelectItem>
                    <SelectItem value="mediterranea">Mediterránea</SelectItem>
                    <SelectItem value="americana">Americana</SelectItem>
                    <SelectItem value="francesa">Francesa</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="fusion">Fusión</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Nivel de Dificultad</Label>
                <Select onValueChange={(value) => handleSelectChange('difficulty', value)}>
                  <SelectTrigger className={`bg-white/50 ${themeClasses.borders}`}>
                    <SelectValue placeholder="¿Qué tan fácil?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facil">Fácil</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ocasión */}
            <div className="space-y-2">
              <Label className="text-gray-700">Ocasión Especial (Opcional)</Label>
              <Select onValueChange={(value) => handleSelectChange('occasion', value)}>
                <SelectTrigger className={`bg-white/50 ${themeClasses.borders}`}>
                  <SelectValue placeholder="¿Es para alguna ocasión especial?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                  <SelectItem value="romantica">Cena Romántica</SelectItem>
                  <SelectItem value="familiar">Reunión Familiar</SelectItem>
                  <SelectItem value="amigos">Con Amigos</SelectItem>
                  <SelectItem value="navidad">Navidad</SelectItem>
                  <SelectItem value="diaria">Comida Diaria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ingredientes Disponibles */}
            <div className="space-y-2">
              <Label className="text-gray-700">Ingredientes que Tienes (Opcional)</Label>
              <Textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                className="bg-white/50 ${themeClasses.borders} focus:border-pink-400 min-h-[80px]"
                placeholder="Escribe los ingredientes que ya tienes en casa, separados por comas..."
              />
            </div>

            <Separator className="bg-pink-100" />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              disabled={!formData.mealType || isGenerating}
            >
              <ChefHat className="w-5 h-5 mr-2" />
              {isGenerating ? 'Generando...' : 'Generar Mi Receta Perfecta'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RecipeForm;