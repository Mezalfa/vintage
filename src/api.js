// API Configuration
export const DEMO_MODE = true; // Set to false when backend is ready

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Sign upload - gets a signed URL for uploading to storage
export async function signUpload(file) {
    if (DEMO_MODE) {
        // Demo mode: return fake signed URL
        return {
            upload_url: 'https://demo-storage.example.com/upload',
            public_url: URL.createObjectURL(file) // Use local preview
        };
    }

    const response = await fetch(`${API_BASE}/api/upload/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filename: file.name,
            content_type: file.type,
            size: file.size
        })
    });

    if (!response.ok) {
        throw new Error('Failed to get signed upload URL');
    }

    return await response.json();
}

// Put file to storage
export async function putFile(url, file) {
    if (DEMO_MODE) {
        // Demo mode: simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
    }

    const response = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }
}

// Create analysis job
export async function createAnalysis(imageUrl) {
    if (DEMO_MODE) {
        // Demo mode: return fake job ID
        return {
            job_id: 'demo-job-' + Date.now()
        };
    }

    const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl })
    });

    if (!response.ok) {
        throw new Error('Failed to create analysis job');
    }

    return await response.json();
}

// Get analysis result
export async function getAnalysis(jobId) {
    if (DEMO_MODE) {
        // Demo mode: return fake result after delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            status: 'DONE',
            result: {
                era_primary: '1970s',
                style_tags: ['Bohemian', 'Vintage', 'Flowy', 'Natural'],
                top3_candidates: [
                    {
                        era: '1970s',
                        style: 'Bohemian Chic',
                        confidence: 0.87,
                        discriminator: 'Flowy silhouette, earthy tones, natural fabrics'
                    },
                    {
                        era: '1960s',
                        style: 'Mod Fashion',
                        confidence: 0.68,
                        discriminator: 'Bold patterns, A-line cuts'
                    },
                    {
                        era: '1980s',
                        style: 'Romantic',
                        confidence: 0.45,
                        discriminator: 'Soft fabrics, feminine details'
                    }
                ],
                rationale: 'The outfit exhibits characteristic 1970s bohemian style with its relaxed fit, natural fabric choices, and earthy color palette. The flowing silhouette and layered appearance are quintessential markers of the era\'s counterculture fashion movement.',
                search_queries: {
                    en: [
                        '1970s bohemian dress',
                        'vintage flowy maxi dress',
                        'boho chic outfit',
                        'earthy tone vintage clothing'
                    ]
                },
                shopping_tips: [
                    '**Silhouettes**: Look for flowing, loose-fitting garments with empire waists or A-line cuts typical of 70s bohemian style.',
                    '**Fabrics**: Prioritize natural materials like cotton, linen, and gauze. These authentic fabrics capture the era\'s aesthetic.',
                    '**Details**: Seek out crochet trim, embroidery, fringe, or bell sleeves which were signature elements of bohemian fashion.',
                    '**Price Range**: Authentic vintage pieces: $50-200. Modern reproductions: $30-100. Designer interpretations: $150-400.',
                    '**Platforms**: Try Etsy for vintage finds, ASOS for modern bohemian, Free People for contemporary boho, and Depop for sustainable options.'
                ]
            }
        };
    }

    const response = await fetch(`${API_BASE}/api/analyze/${jobId}`);

    if (!response.ok) {
        throw new Error('Failed to get analysis result');
    }

    return await response.json();
}
