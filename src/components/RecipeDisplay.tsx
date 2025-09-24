import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ChefHat, Clock, Users, Download, Share2, 
  ArrowLeft, CheckCircle, Utensils, Star
} from 'lucide-react';

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  difficulty: string;
  category: string;
  rating: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  tips: string[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeDisplayProps {
  recipe: Recipe | null;
  onBack: () => void;
  onExportPDF: () => void;
  onShareWhatsApp: () => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onBack, onExportPDF, onShareWhatsApp }) => {
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nueva Receta
          </Button>
          
          <div className="flex space-x-3">
            <Button
              onClick={onExportPDF}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button
              onClick={onShareWhatsApp}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recipe Header */}
          <div className="lg:col-span-3">
            <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full">
                    <ChefHat className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {recipe.description}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center items-center mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < recipe.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({recipe.rating}/5)</span>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <Clock className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <p className="text-gray-600">Tiempo</p>
                  <p className="font-medium">{recipe.prepTime}</p>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <Users className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                  <p className="text-gray-600">Porciones</p>
                  <p className="font-medium">{recipe.servings}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Utensils className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-gray-600">Dificultad</p>
                  <p className="font-medium">{recipe.difficulty}</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <Star className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                  <p className="text-gray-600">Categoría</p>
                  <p className="font-medium">{recipe.category}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {recipe.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border-pink-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Ingredients */}
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm h-fit">
              <h2 className="mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-pink-500" />
                Ingredientes
              </h2>
              <div className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <h2 className="mb-6 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-pink-500" />
                Instrucciones
              </h2>
              <div className="space-y-4">
                {recipe.instructions?.map((instruction, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">{instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tips & Notes */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="lg:col-span-3">
              <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <h2 className="mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-pink-500" />
                  Tips del Chef
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipe.tips.map((tip, index) => (
                    <div key={index} className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Nutritional Info */}
          {recipe.nutrition && (
            <div className="lg:col-span-3">
              <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <h2 className="mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-pink-500" />
                  Información Nutricional (por porción)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <p className="text-pink-600">Calorías</p>
                    <p className="font-medium">{recipe.nutrition.calories}</p>
                  </div>
                  <div className="text-center p-3 bg-rose-50 rounded-lg">
                    <p className="text-rose-600">Proteínas</p>
                    <p className="font-medium">{recipe.nutrition.protein}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-purple-600">Carbohidratos</p>
                    <p className="font-medium">{recipe.nutrition.carbs}</p>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <p className="text-indigo-600">Grasas</p>
                    <p className="font-medium">{recipe.nutrition.fat}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;