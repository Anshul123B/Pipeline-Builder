import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const API_BASE_URL = 'https://pipeline-builder-zc3n.onrender.com';

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
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();

            // Validate response structure
            if (!result.hasOwnProperty('is_dag') || !result.hasOwnProperty('num_nodes') || !result.hasOwnProperty('num_edges')) {
                throw new Error('Invalid response format from server');
            }

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
            
            let errorMessage = `
❌ Submission Failed
━━━━━━━━━━━━━━━━━━━━━

Unable to validate pipeline.

Error: ${error.message}

`;

            // Provide specific guidance based on error type
            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorMessage += `Network Error: Cannot reach backend server.

Please ensure:
1. Backend is deployed on Render.com
2. API URL is correct: ${API_BASE_URL}
3. Check your internet connection
4. Backend service may be spinning up (can take 30s on free tier)

Retry in a few moments.`;
            } else if (error.message.includes('HTTP 502') || error.message.includes('HTTP 503')) {
                errorMessage += `Backend Service Unavailable

This usually means:
1. Service is starting up (free tier auto-spindown)
2. Temporary server issue

Please wait 30 seconds and try again.`;
            } else if (error.message.includes('HTTP 404')) {
                errorMessage += `API Endpoint Not Found

Please verify:
1. Backend deployment URL is correct
2. Endpoint path is /pipelines/parse`;
            } else {
                errorMessage += `Backend: ${API_BASE_URL}

To start backend locally:
npm start (in the backend directory)`;
            }

            alert(errorMessage.trim());
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
