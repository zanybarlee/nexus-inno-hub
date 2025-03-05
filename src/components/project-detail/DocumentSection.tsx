
interface Document {
  name: string;
  type: string;
  date: string;
  status: string;
}

interface DocumentSectionProps {
  documents: Document[];
  documentStatusColors: Record<string, string>;
}

const DocumentSection = ({ documents, documentStatusColors }: DocumentSectionProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
        <h2 className="text-xl font-semibold mb-4">Submitted Documents</h2>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
              <div>
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.date}</p>
              </div>
              <span className={`text-xs font-medium ${documentStatusColors[doc.status] || 'text-gray-600'}`}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline"
            size="sm"
            className="w-full"
          >
            Upload New Document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentSection;
