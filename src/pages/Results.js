import { useEffect, useMemo, useState } from 'react'

export default function Results() {
    const [result, setResult] = useState(null)
    const imageUrl = useMemo(() => localStorage.getItem('latest_image_url') || '1.jpg', [])

    useEffect(() => {
        const raw = localStorage.getItem('latest_result')
        if (raw) setResult(JSON.parse(raw))
    }, [])

    if (!result) {
        return (
            <div className="card">
                <div className="section-title">No result</div>
                <div className="small">Run an analysis on the Upload page first.</div>
            </div>
        )
    }

    return (
        <div className="results-grid">
            {/* Left: results */}
            <div className="card">
                <div className="section-title">Vintage insights</div>

                <div className="kv">
                    <div className="small">Primary era</div><div className="era-badge">{result.era_primary || '-'}</div>
                    <div className="small">Style tags</div>
                    <div className="chips">
                        {(result.style_tags || []).map((t, i) => (
                            <span key={i} className="chip" onClick={() => openGoogle(t)}>{t}</span>
                        ))}
                    </div>
                </div>

                <div className="section-title">Top-3 candidates</div>
                <div style={{ display:'grid', gap:10 }}>
                    {(result.top3_candidates || []).map((c, i) => (
                        <div key={i} className="cand">
                            <div className="title">{(c.era || '') + ' — ' + (c.style || '')}</div>
                            <div className="pct">{Math.round((c.confidence || 0) * 100)}%</div>
                            <div className="meter"><span style={{ width: Math.round((c.confidence || 0) * 100) + '%' }}></span></div>
                            <div className="small" style={{ gridColumn:'1 / -1' }}>{c.discriminator || ''}</div>
                        </div>
                    ))}
                </div>

                <div className="section-title">Why</div>
                <div className="callout small">{result.rationale || ''}</div>

                <div className="section-title">Search queries</div>
                <div className="small" style={{ marginBottom:6 }}>English</div>
                <div className="chips">
                    {((result.search_queries && result.search_queries.en) || []).map((q, i) => (
                        <span key={i} className="chip" onClick={() => openGoogle(q)}>{q}</span>
                    ))}
                </div>

                <div className="section-title">Shopping tips</div>
                <TipsList tips={result.shopping_tips || []} />
            </div>

            {/* Right: image */}
            <div className="card">
                <div className="section-title">Your photo</div>
                <div className="preview">
                    <img
                        src={imageUrl}
                        alt="analyzed"
                        onError={(e)=>{ e.currentTarget.replaceWith(placeholder()) }}
                        style={{ width:'100%', borderRadius:12, border:'1px solid var(--border)' }}
                    />
                </div>
                <div className="small" style={{ marginTop:8 }}>
                    <a href="/public" style={{ textDecoration:'none' }}>Analyze another image</a>
                </div>
            </div>
        </div>
    )
}

/* -------- Tips renderer (title = Silhouettes / Fabrics / …) -------- */
function TipsList({ tips }) {
    if (!tips.length) return <div className="small">No shopping tips in this result.</div>
    return (
        <div className="tips-grid">
            {tips.map((t, i) => {
                const { title, body } = splitTip(t)
                return (
                    <div key={i} className="tip-card">
                        <div className="tip-head">
                            <div className="tip-icon" dangerouslySetInnerHTML={{ __html: iconFor(title) }} />
                            <div className="tip-title">{title}</div>
                        </div>
                        <div className="tip-body" dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                )
            })}
        </div>
    )
}

/* Robust parser: handles **Title:** Body / **Title**: Body / Title: Body / Chinese colon etc. */
function splitTip(s) {
    const raw = String(s || '').trim()

    // **Title:** Body  or  **Title**: Body
    let m = /^\s*\*\*\s*([^*]+?)\s*\*\*\s*[:：\-–—]\s*(.+)$/.exec(raw)
    if (m) return { title: m[1].trim(), body: m[2].trim() }

    // Title: Body
    m = /^\s*([A-Za-z\u4e00-\u9fa5\/&\s]+?)\s*[:：]\s*(.+)$/.exec(raw)
    if (m) return { title: m[1].trim(), body: m[2].trim() }

    // **Title** Body
    m = /^\s*\*\*\s*([^*]+?)\s*\*\*\s*(.+)$/.exec(raw)
    if (m) return { title: m[1].trim(), body: m[2].trim() }

    // keyword fallback
    const lower = raw.toLowerCase()
    const map = [
        ['silhouettes','Silhouettes'],['silhouette','Silhouettes'],
        ['fabrics','Fabrics'],['fabric','Fabrics'],['materials','Fabrics'],['material','Fabrics'],
        ['details','Details'],['detail','Details'],
        ['price range','Price Range'],['price','Price Range'],['pricing','Price Range'],
        ['platforms','Platforms'],['platform','Platforms'],['marketplace','Platforms']
    ]
    for (const [needle, title] of map) {
        if (lower.includes(needle)) return { title, body: raw.replace(/\*\*/g,'') }
    }
    return { title: 'Tip', body: raw.replace(/\*\*/g,'') }
}

function iconFor(title) {
    const t = (title || '').toLowerCase()
    if (t.includes('silhouette')) {
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87M8 21v-2a4 4 0 0 1 3-3.87M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>'
    }
    if (t.includes('fabric') || t.includes('material')) {
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 17l8 4 8-4"/><path d="M4 12l8 4 8-4"/></svg>'
    }
    if (t.includes('detail')) {
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"/></svg>'
    }
    if (t.includes('price')) {
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v7a2 2 0 0 1-2 2H7l-4-4V5a2 2 0 0 1 2-2h7"/><path d="M20 7h-7"/><path d="M18 5l2 2-2 2"/></svg>'
    }
    if (t.includes('platform')) {
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
    }
    return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2f9e44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
}

function openGoogle(q) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank')
}

function placeholder(){
    const d = document.createElement('div')
    d.className = 'placeholder'
    d.textContent = 'Image not found'
    return d
}
