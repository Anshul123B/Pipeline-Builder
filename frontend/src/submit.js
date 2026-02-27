import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const { nodes, edges } = useStore(
        (state) => ({ nodes: state.nodes, edges: state.edges }),
        shallow
    );

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            alert('⚠️ Pipeline is empty!\n\nPlease add some nodes to the canvas before submitting.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Create user-friendly alert message
            const dagStatus = result.is_dag 
                ? '✅ Valid DAG (No cycles detected)' 
                : '❌ Invalid DAG (Cycles detected!)';

            const message = `
🔍 Pipeline Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Statistics:
   • Nodes: ${result.num_nodes}
   • Edges: ${result.num_edges}

📋 Validation:
   ${dagStatus}

${result.is_dag 
    ? '🎉 Your pipeline is valid and ready for execution!' 
    : '⚠️ Please remove cycles to create a valid pipeline.'}
            `.trim();

            alert(message);

        } catch (error) {
            console.error('Pipeline submission error:', error);
            
            const errorMessage = `
❌ Submission Failed
━━━━━━━━━━━━━━━━━━━━━

Unable to validate pipeline.

Error: ${error.message}

Please ensure the backend server is running at:
${API_BASE_URL}

To start the backend, run:
npm start (in the backend directory)
            `.trim();

            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <button 
                className="submit-button"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span>⏳</span>
                        <span>Validating...</span>
                    </>
                ) : (
                    <>
                        <span>🚀</span>
                        <span>Submit Pipeline</span>
                    </>
                )}
            </button>
        </div>
    );
};
