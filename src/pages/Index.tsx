import { useState } from 'react';
import { Leaf, Brain, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from '@/components/ImageUpload';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-potato-leaves.jpg';

// Mock data for demonstration
const mockDiseases = [
  {
    name: "Late Blight",
    confidence: 87,
    severity: 'high' as const,
    description: "Late blight is caused by the fungus-like organism Phytophthora infestans. It appears as dark, water-soaked lesions on leaves that can quickly spread and destroy the entire plant.",
    treatment: "Apply fungicide immediately, improve air circulation, and remove infected plant material. Consider copper-based treatments for organic management."
  },
  {
    name: "Early Blight",
    confidence: 23,
    severity: 'medium' as const,
    description: "Early blight is caused by Alternaria solani and creates dark spots with concentric rings on older leaves.",
    treatment: "Use preventive fungicide sprays and ensure proper plant spacing for air circulation."
  },
  {
    name: "Healthy",
    confidence: 12,
    severity: 'low' as const,
    description: "The leaf appears to be healthy with no visible signs of disease.",
    treatment: "Continue current care practices and monitor regularly for any changes."
  }
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = async (file: File) => {
    setSelectedImage(file);
    setResults(null);
    
    // Simulate API call to FastAPI backend
    setIsLoading(true);
    
    // Mock API call - replace with actual FastAPI endpoint
    setTimeout(() => {
      setResults(mockDiseases);
      setIsLoading(false);
      toast.success("Analysis complete! Check the results below.");
    }, 3000);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center animate-float">
                <Leaf className="h-8 w-8 text-accent-foreground" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
                Potato Disease Detector
              </h1>
            </div>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Upload an image of a potato leaf and our AI-powered system will instantly analyze it 
              for diseases, helping you make informed decisions for your crops.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered Analysis
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Camera className="h-4 w-4 mr-2" />
                Instant Results
              </Badge>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Leaf className="h-4 w-4 mr-2" />
                Expert Accuracy
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Start Your Analysis
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simply upload a clear image of a potato leaf, and our advanced machine learning model 
                will identify potential diseases and provide detailed information.
              </p>
            </div>
            
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onImageRemove={handleImageRemove}
              isLoading={isLoading}
            />
          </div>

          {/* Results Section */}
          {(results || isLoading) && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground">
                  Analysis Results
                </h2>
              </div>
              
              <ResultsDisplay results={results} isLoading={isLoading} />
            </div>
          )}

          {/* Info Cards */}
          {!selectedImage && !results && (
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload Image
                </h3>
                <p className="text-muted-foreground text-sm">
                  Take or upload a clear photo of the potato leaf you want to analyze
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  AI Analysis
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our trained model processes the image and identifies potential diseases
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Get Results
                </h3>
                <p className="text-muted-foreground text-sm">
                  Receive detailed disease information and treatment recommendations
                </p>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/80">
            Built with AI technology for agricultural disease detection. 
            Always consult with agricultural experts for critical decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;