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

const RecipeForm = ({ onGenerateRecipe, userInfo, onLogout }) => {
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addDietaryRestriction = (restriction) => {
    if (!formData.dietaryRestrictions.includes(restriction)) {
      setFormData({
        ...formData,
        dietaryRestrictions: [...formData.dietaryRestrictions, restriction]
      });
    }
  };

  const removeDietaryRestriction = (restriction) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateRecipe(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-full">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ¡Hola, {userInfo.name}!
              </h1>
              <p className="text-gray-600">Cuéntanos qué te gustaría cocinar</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            Cerrar Sesión
          </Button>
        </div>

        <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Comida */}
            <div className="space-y-2">
              <Label className="text-gray-700 flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-pink-500" />
                Tipo de Comida
              </Label>
              <Select onValueChange={(value) => handleSelectChange('mealType', value)}>
                <SelectTrigger className="bg-white/50 border-pink-200 focus:border-pink-400">
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
                  <Clock className="w-4 h-4 mr-2 text-pink-500" />
                  Tiempo de Preparación
                </Label>
                <Select onValueChange={(value) => handleSelectChange('cookingTime', value)}>
                  <SelectTrigger className="bg-white/50 border-pink-200 focus:border-pink-400">
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
                  <Users className="w-4 h-4 mr-2 text-pink-500" />
                  Número de Porciones
                </Label>
                <Input
                  name="servings"
                  type="number"
                  value={formData.servings}
                  onChange={handleInputChange}
                  className="bg-white/50 border-pink-200 focus:border-pink-400"
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
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'border-pink-200 text-pink-600 hover:bg-pink-50'
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
                  className="bg-white/50 border-pink-200 focus:border-pink-400"
                  placeholder="Agregar restricción personalizada"
                />
                <Button
                  type="button"
                  onClick={addCustomRestriction}
                  size="sm"
                  className="bg-pink-500 hover:bg-pink-600"
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
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
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
                  <SelectTrigger className="bg-white/50 border-pink-200 focus:border-pink-400">
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
                  <SelectTrigger className="bg-white/50 border-pink-200 focus:border-pink-400">
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
                <SelectTrigger className="bg-white/50 border-pink-200 focus:border-pink-400">
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
                className="bg-white/50 border-pink-200 focus:border-pink-400 min-h-[80px]"
                placeholder="Escribe los ingredientes que ya tienes en casa, separados por comas..."
              />
            </div>

            <Separator className="bg-pink-100" />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              disabled={!formData.mealType}
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Generar Mi Receta Perfecta
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RecipeForm;