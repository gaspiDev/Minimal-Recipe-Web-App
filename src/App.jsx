import React, { useState } from 'react';
import LoginRegister from './components/LoginRegister';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import { toast } from 'sonner@2.0.3';

// Mock data para simular respuesta de OpenAI
const generateMockRecipe = (formData) => {
  const mockRecipes = {
    desayuno: {
      title: "Pancakes de Avena con Frutos Rojos",
      description: "Deliciosos pancakes saludables perfectos para comenzar el día con energía y sabor.",
      prepTime: "25 minutos",
      servings: formData.servings || "4 personas",
      difficulty: "Fácil",
      category: "Desayuno",
      rating: 5,
      tags: ["Saludable", "Vegetariano", "Rápido", "Nutritivo"],
      ingredients: [
        "2 tazas de avena en hojuelas",
        "2 huevos grandes",
        "1 taza de leche (o leche vegetal)",
        "2 cucharadas de miel o maple",
        "1 cucharadita de polvo de hornear",
        "1/2 cucharadita de canela",
        "1 taza de frutos rojos mixtos",
        "2 cucharadas de aceite de coco",
        "1 pizca de sal",
        "Vanilla al gusto"
      ],
      instructions: [
        "En un procesador de alimentos, muele la avena hasta obtener una harina fina.",
        "En un bowl grande, bate los huevos y agrega la leche, miel y vanilla.",
        "Incorpora la harina de avena, polvo de hornear, canela y sal. Mezcla hasta obtener una masa homogénea.",
        "Deja reposar la masa por 5 minutos para que espese.",
        "Calienta una sartén antiadherente a fuego medio y agrega un poco de aceite de coco.",
        "Vierte 1/4 de taza de masa por cada pancake. Cocina por 2-3 minutos hasta que aparezcan burbujas.",
        "Voltea cuidadosamente y cocina por 2 minutos más hasta dorar.",
        "Sirve calientes con frutos rojos frescos y un toque de miel."
      ],
      tips: [
        "Para pancakes más esponjosos, no mezcles demasiado la masa.",
        "Puedes preparar la harina de avena con anticipación y guardarla en un frasco.",
        "Si la masa está muy espesa, agrega un poco más de leche.",
        "Los frutos rojos congelados también funcionan perfecto."
      ],
      nutrition: {
        calories: "285 kcal",
        protein: "12g",
        carbs: "42g",
        fat: "8g"
      }
    },
    almuerzo: {
      title: "Ensalada Buddha Bowl Mediterránea",
      description: "Una explosión de sabores mediterráneos en un bowl nutritivo y colorido.",
      prepTime: "30 minutos",
      servings: formData.servings || "2 personas",
      difficulty: "Fácil",
      category: "Almuerzo",
      rating: 5,
      tags: ["Vegano", "Saludable", "Mediterráneo", "Sin Gluten"],
      ingredients: [
        "2 tazas de quinoa cocida",
        "1 pepino cortado en cubos",
        "2 tomates cherry cortados a la mitad",
        "1/2 taza de aceitunas Kalamata",
        "1/2 cebolla roja en juliana",
        "1/2 taza de garbanzos cocidos",
        "100g de queso feta desmenuzado",
        "2 cucharadas de aceite de oliva extra virgen",
        "1 limón (jugo)",
        "1 cucharadita de orégano seco",
        "Sal y pimienta al gusto",
        "Hojas de menta fresca"
      ],
      instructions: [
        "Cocina la quinoa según las instrucciones del paquete y deja enfriar.",
        "En un bowl grande, combina la quinoa fría con pepino, tomates y cebolla.",
        "Agrega los garbanzos y aceitunas.",
        "En un recipiente pequeño, prepara el aderezo mezclando aceite de oliva, jugo de limón, orégano, sal y pimienta.",
        "Vierte el aderezo sobre la ensalada y mezcla suavemente.",
        "Distribuye en bowls individuales y corona con queso feta.",
        "Decora con hojas de menta fresca antes de servir."
      ],
      tips: [
        "Puedes preparar todos los ingredientes con anticipación.",
        "Para una versión vegana, omite el queso feta o sustitúyelo por queso vegano.",
        "Agrega semillas de girasol o nueces para más textura.",
        "Esta ensalada mejora en sabor si la dejas reposar 15 minutos antes de servir."
      ],
      nutrition: {
        calories: "420 kcal",
        protein: "18g",
        carbs: "52g",
        fat: "16g"
      }
    },
    cena: {
      title: "Salmón Glaseado con Vegetales Asados",
      description: "Un plato elegante y nutritivo perfecto para una cena especial.",
      prepTime: "35 minutos",
      servings: formData.servings || "4 personas",
      difficulty: "Intermedio",
      category: "Cena",
      rating: 5,
      tags: ["Saludable", "Proteína", "Omega-3", "Gourmet"],
      ingredients: [
        "4 filetes de salmón (150g c/u)",
        "2 calabacines cortados en rodajas",
        "1 pimiento rojo en tiras",
        "1 pimiento amarillo en tiras",
        "200g de espárragos",
        "3 cucharadas de miel",
        "2 cucharadas de salsa de soja",
        "1 cucharada de aceite de sésamo",
        "2 dientes de ajo picados",
        "1 cucharada de jengibre rallado",
        "3 cucharadas de aceite de oliva",
        "Sal y pimienta al gusto",
        "Semillas de sésamo para decorar"
      ],
      instructions: [
        "Precalienta el horno a 200°C.",
        "En un bowl, mezcla miel, salsa de soja, aceite de sésamo, ajo y jengibre para hacer el glaseado.",
        "Coloca los vegetales en una bandeja para horno, rocía con aceite de oliva, sal y pimienta.",
        "Hornea los vegetales por 15 minutos.",
        "Mientras tanto, marina el salmón con la mitad del glaseado por 10 minutos.",
        "Calienta una sartén a fuego medio-alto y cocina el salmón por 3-4 minutos por lado.",
        "En los últimos 2 minutos, pincela con el glaseado restante.",
        "Sirve el salmón sobre los vegetales asados y decora con semillas de sésamo."
      ],
      tips: [
        "No cocines demasiado el salmón para mantenerlo jugoso.",
        "Puedes sustituir el salmón por otro pescado graso como trucha.",
        "Los vegetales deben quedar tiernos pero con un poco de firmeza.",
        "Acompaña con arroz integral o quinoa para una comida completa."
      ],
      nutrition: {
        calories: "380 kcal",
        protein: "32g",
        carbs: "18g", 
        fat: "22g"
      }
    },
    postre: {
      title: "Mousse de Chocolate y Aguacate",
      description: "Un postre cremoso y saludable que sorprenderá a todos con su textura sedosa.",
      prepTime: "15 minutos + 2h refrigeración",
      servings: formData.servings || "6 personas",
      difficulty: "Fácil",
      category: "Postre",
      rating: 4,
      tags: ["Vegano", "Sin Gluten", "Saludable", "Cremoso"],
      ingredients: [
        "3 aguacates maduros",
        "1/4 taza de cacao en polvo sin azúcar",
        "1/4 taza de jarabe de maple",
        "2 cucharadas de leche de coco",
        "1 cucharadita de extracto de vainilla",
        "1 pizca de sal marina",
        "Frutos rojos para decorar",
        "Menta fresca",
        "Cacao en polvo para espolvorear"
      ],
      instructions: [
        "Corta los aguacates por la mitad, retira el hueso y extrae la pulpa.",
        "En un procesador de alimentos, combina aguacate, cacao, jarabe de maple y sal.",
        "Procesa hasta obtener una mezcla completamente lisa y cremosa.",
        "Agrega leche de coco y vainilla, procesa nuevamente.",
        "Prueba y ajusta el dulzor si es necesario.",
        "Divide la mousse en copas individuales.",
        "Refrigera por al menos 2 horas antes de servir.",
        "Decora con frutos rojos, menta y un toque de cacao en polvo."
      ],
      tips: [
        "Asegúrate de que los aguacates estén muy maduros para mejor cremosidad.",
        "Puedes agregar un toque de chile en polvo para un sabor mexicano.",
        "La mousse se conserva en refrigerador hasta 3 días.",
        "Para una versión más dulce, agrega dátiles sin hueso al procesar."
      ],
      nutrition: {
        calories: "195 kcal",
        protein: "4g",
        carbs: "22g",
        fat: "14g"
      }
    }
  };

  const selectedRecipe = mockRecipes[formData.mealType] || mockRecipes.almuerzo;
  
  // Personalizar según las restricciones dietéticas
  if (formData.dietaryRestrictions.includes('Vegano') && selectedRecipe.tags.includes('Vegano')) {
    selectedRecipe.tags.push('100% Plant-Based');
  }
  
  if (formData.dietaryRestrictions.includes('Sin Gluten')) {
    selectedRecipe.tags.push('Libre de Gluten');
  }

  return selectedRecipe;
};

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'form', 'recipe'
  const [userInfo, setUserInfo] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = (fullName) => {
    setUserInfo({ name: fullName });
    setCurrentView('form');
    toast.success(`¡Bienvenida, ${fullName}! 🎉`);
  };

  const handleLogout = () => {
    setUserInfo(null);
    setCurrentRecipe(null);
    setCurrentView('login');
    toast.success('Sesión cerrada correctamente');
  };

  const handleGenerateRecipe = async (formData) => {
    setIsGenerating(true);
    toast.loading('Generando tu receta perfecta...', { duration: 2000 });
    
    // Simular llamada a API
    setTimeout(() => {
      const recipe = generateMockRecipe(formData);
      setCurrentRecipe(recipe);
      setCurrentView('recipe');
      setIsGenerating(false);
      toast.success('¡Receta generada con éxito! 🍽️');
    }, 2000);
  };

  const handleBack = () => {
    setCurrentRecipe(null);
    setCurrentView('form');
  };

  const handleExportPDF = () => {
    toast.success('Funcionalidad de PDF próximamente disponible! 📄');
    // Aquí iría la lógica para generar y descargar PDF
  };

  const handleShareWhatsApp = () => {
    const message = `¡Mira esta deliciosa receta que generé con CocinaAI! 🍽️\n\n*${currentRecipe.title}*\n\n${currentRecipe.description}\n\n⏰ Tiempo: ${currentRecipe.prepTime}\n👥 Porciones: ${currentRecipe.servings}\n\n¡Pruébala y cuéntame qué tal! 😋`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('¡Compartiendo en WhatsApp! 📱');
  };

  return (
    <div className="App">
      {currentView === 'login' && (
        <LoginRegister onLogin={handleLogin} />
      )}
      
      {currentView === 'form' && (
        <RecipeForm 
          onGenerateRecipe={handleGenerateRecipe}
          userInfo={userInfo}
          onLogout={handleLogout}
          isGenerating={isGenerating}
        />
      )}
      
      {currentView === 'recipe' && (
        <RecipeDisplay 
          recipe={currentRecipe}
          onBack={handleBack}
          onExportPDF={handleExportPDF}
          onShareWhatsApp={handleShareWhatsApp}
        />
      )}
    </div>
  );
}

export default App;