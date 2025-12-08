export default function DocsPage() {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 prose max-w-none">
            <h1>API Documentation</h1>

            <h2>Authentication</h2>
            <p>All API requests must include your API Key in the <code>X-API-Key</code> header.</p>
            <pre className="bg-gray-100 p-4 rounded">
                X-API-Key: sk_your_api_key_here
            </pre>

            <h2>Services</h2>

            <h3>Ministry of Commerce Mock</h3>
            <h4>Verify Commercial Registration</h4>
            <p>Endpoint: <code>GET /api/gateway/commerce/verify/{'{cr_number}'}</code></p>

            <h5>Example Request</h5>
            <pre className="bg-gray-100 p-4 rounded">
                curl http://localhost:3000/api/gateway/commerce/verify/1010123456 \
                -H "X-API-Key: sk_..."
            </pre>

            <h5>Example Response</h5>
            <pre className="bg-gray-100 p-4 rounded">
                {`{
  "cr_number": "1010123456",
  "company_name": "Company 1010123456 Test",
  "status": "active",
  "expiry_date": "2025-12-31",
  "activities": [
    "Retail",
    "Import/Export"
  ]
}`}
            </pre>
        </div>
    );
}
