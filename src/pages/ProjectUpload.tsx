
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, Info, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UploadBox from '@/components/ui/custom/UploadBox';
import Button from '@/components/ui/custom/Button';

const ProjectUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    passed: string[];
    failed: string[];
  }>({
    passed: [],
    failed: []
  });
  
  const navigate = useNavigate();
  
  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleAnalyzeModels = () => {
    if (files.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      // Mock results
      setAnalysisResults({
        passed: [
          'Building height compliance',
          'Floor area ratio',
          'Fire safety requirements',
          'Accessibility requirements'
        ],
        failed: [
          'Setback requirements',
          'Parking provisions'
        ]
      });
    }, 3000);
  };
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload BIM Models</h1>
            <p className="text-muted-foreground">Upload your BIM models for automated compliance checking</p>
          </div>
          
          <div className="space-y-8">
            {/* Upload Box */}
            <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Upload className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">BIM Model Upload</h2>
                </div>
                
                <UploadBox onFilesAdded={handleFilesAdded} />
                
                {files.length > 0 && !analysisComplete && (
                  <div className="text-center mt-6">
                    <Button
                      variant="primary"
                      onClick={handleAnalyzeModels}
                      isLoading={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Models'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Analysis Results */}
            {analysisComplete && (
              <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 animate-scale-in">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-xl font-semibold">Compliance Analysis Results</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Passed Checks */}
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className="font-medium text-green-800">Passed Checks</h3>
                      </div>
                      
                      <ul className="space-y-2">
                        {analysisResults.passed.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-green-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Failed Checks */}
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <div className="flex items-center mb-4">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="font-medium text-red-800">Failed Checks</h3>
                      </div>
                      
                      <ul className="space-y-2">
                        {analysisResults.failed.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-red-700">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      You can proceed with the submission with compliance issues, but they will need to be addressed during the review process. Consider fixing these issues before submission to expedite approval.
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => {
                        setAnalysisComplete(false);
                        setFiles([]);
                      }}
                    >
                      Upload New Models
                    </Button>
                    <Button 
                      variant="primary"
                      rightIcon={<ArrowRight size={18} />}
                      onClick={() => navigate('/dashboard')}
                    >
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectUpload;
