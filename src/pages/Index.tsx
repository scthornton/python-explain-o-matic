
import React, { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import CodeDisplay from '@/components/CodeDisplay';
import CopyButton from '@/components/CopyButton';
import Header from '@/components/Header';
import { explainPythonCode } from '@/utils/pythonExplainer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [pythonCode, setPythonCode] = useState('');
  const [explainedCode, setExplainedCode] = useState('');
  const [activeTab, setActiveTab] = useState('input');
  const { toast } = useToast();

  const handleExplain = () => {
    if (!pythonCode.trim()) {
      toast({
        title: "No code to explain",
        description: "Please enter some Python code first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = explainPythonCode(pythonCode);
      setExplainedCode(result);
      setActiveTab('output');
      toast({
        title: "Code explained!",
        description: "Your Python code has been annotated with explanations.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error explaining code:', error);
      toast({
        title: "Error explaining code",
        description: "There was a problem processing your Python code.",
        variant: "destructive"
      });
    }
  };

  const handleSampleCode = () => {
    const sampleCode = `# A simple Python program demonstrating various concepts

def calculate_factorial(n):
    """Calculate the factorial of a number recursively"""
    if n <= 1:
        return 1
    else:
        return n * calculate_factorial(n - 1)

class MathOperations:
    def __init__(self, value):
        self.value = value
    
    def square(self):
        return self.value ** 2
    
    def cube(self):
        return self.value ** 3

# Main program execution
if __name__ == "__main__":
    # Get user input
    try:
        num = int(input("Enter a number: "))
        
        # Calculate factorial
        result = calculate_factorial(num)
        print(f"The factorial of {num} is {result}")
        
        # Use the class
        math_op = MathOperations(num)
        print(f"Square: {math_op.square()}")
        print(f"Cube: {math_op.cube()}")
        
    except ValueError:
        print("Please enter a valid number")
    except RecursionError:
        print("Number too large for recursive calculation")`;

    setPythonCode(sampleCode);
    toast({
      title: "Sample code loaded",
      description: "You can now explain this sample or replace it with your own code.",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <Header />
        
        <div className="mb-6">
          <p className="text-lg text-muted-foreground text-center">
            Paste your Python code and get inline explanations for each part
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="input">Input Code</TabsTrigger>
              <TabsTrigger value="output" disabled={!explainedCode}>
                Explained Code
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSampleCode}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Load Sample
              </Button>
              
              <Button 
                onClick={handleExplain} 
                className="gap-2"
                disabled={!pythonCode.trim()}
              >
                <ArrowRight className="h-4 w-4" />
                Explain Code
              </Button>
            </div>
          </div>

          <TabsContent value="input" className="mt-0 animate-fade-in">
            <CodeEditor 
              value={pythonCode} 
              onChange={setPythonCode} 
              className="w-full"
            />
          </TabsContent>
          
          <TabsContent value="output" className="mt-0 animate-fade-in">
            <div className="relative">
              <CodeDisplay 
                code={explainedCode} 
                className="w-full"
              />
              <div className="absolute top-3 right-3">
                <CopyButton text={explainedCode} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-10" />
        
        <div className="text-sm text-muted-foreground">
          <h3 className="font-medium mb-2">About Python Explain-o-matic</h3>
          <p>
            This tool helps you understand Python code by adding explanations as inline comments.
            It detects functions, classes, loops, conditionals, and other Python constructs, and adds
            informative comments that explain what each part of the code does.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
