import { AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Disease {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment?: string;
}

interface ResultsDisplayProps {
  results?: Disease[];
  isLoading?: boolean;
}

export const ResultsDisplay = ({ results, isLoading }: ResultsDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="p-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <TrendingUp className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-semibold">Analyzing Image...</h3>
          <p className="text-muted-foreground">
            Our AI is examining your potato leaf for signs of disease
          </p>
          <Progress value={65} className="w-full max-w-md mx-auto" />
        </div>
      </Card>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'medium':
        return <Info className="h-5 w-5 text-earth" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-accent" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const topResult = results[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Primary Result */}
      <Card className="p-8 border-l-4 border-l-accent shadow-card">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {getSeverityIcon(topResult.severity)}
                <h3 className="text-2xl font-bold text-foreground">
                  {topResult.name}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={getSeverityColor(topResult.severity) as any}>
                  {topResult.severity.toUpperCase()} RISK
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-accent">
                    {Math.round(topResult.confidence)}%
                  </span>
                  <span className="text-muted-foreground">confidence</span>
                </div>
              </div>
            </div>
          </div>
          
          <Progress 
            value={topResult.confidence} 
            className="h-3"
          />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">
                {topResult.description}
              </p>
            </div>
            
            {topResult.treatment && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Recommended Treatment</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {topResult.treatment}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Other Results */}
      {results.length > 1 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Other Possible Diseases</h4>
          <div className="grid gap-4">
            {results.slice(1).map((disease, index) => (
              <Card key={index} className="p-4 hover:shadow-card transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(disease.severity)}
                    <span className="font-medium text-foreground">{disease.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={disease.confidence} 
                      className="w-24 h-2"
                    />
                    <span className="text-sm font-medium text-muted-foreground w-12">
                      {Math.round(disease.confidence)}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-accent mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground">Important Note</h4>
            <p className="text-sm text-muted-foreground">
              This AI analysis is for guidance only. For critical decisions, please consult with agricultural experts or plant pathologists.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
