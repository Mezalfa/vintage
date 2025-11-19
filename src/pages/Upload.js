import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEMO_MODE, signUpload, putFile, createAnalysis, getAnalysis } from '../api'

export default function Upload() {
    const nav = useNavigate()
    const [drag, setDrag] = useState(false)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [overlay, setOverlay] = useState({ show: false, title: '', desc: '', pct: 0, sub: '' })
    const inputRef = useRef(null)

    const ACCEPT = ['image/jpeg','image/png','image/webp']
    const MAX_MB = 50

    function select(f) {
        if (!f) return
        if (!ACCEPT.includes(f.type)) return alert('Unsupported type. Use JPG / PNG / WEBP.')
        if (f.size > MAX_MB*1024*1024) return alert('File > 50MB.')
        setFile(f)
        const reader = new FileReader()
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(f)
    }

    function show(title, desc, pct=0, sub='') { setOverlay({ show:true, title, desc, pct, sub }) }
    function update(o) { setOverlay(s => ({ ...s, ...o })) }
    function hide(){ setOverlay(s => ({ ...s, show:false, pct:0, sub:'' })) }

    async function startAnalyze() {
        if (!file) return alert('Select an image first.')

        try {
            show('Uploading…', 'Uploading your image to secure storage.', 8)

            // 1) 获取签名并上传
            const signed = await signUpload(file)
            update({ desc: DEMO_MODE? 'Simulating upload in demo mode…' : 'Putting file to storage…', pct: 28 })
            await putFile(signed.upload_url, file)
            const imageUrl = signed.public_url

            // 2) 创建任务
            update({ title: 'Analyzing image…', desc: 'Vision extraction & Gemini inference.', pct: 60 })
            const { job_id } = await createAnalysis(imageUrl)

            // 3) 轮询
            let tries = 0, status
            while (true) {
                await sleep(800)
                tries++
                status = await getAnalysis(job_id)
                if (status.status === 'DONE') break
                if (status.status === 'ERROR') throw new Error('Analysis failed')
                update({ pct: Math.min(90, 60 + tries*5) })
            }

            // 4) 保存并跳转
            update({ desc: 'Finalizing…', pct: 96 })
            localStorage.setItem('latest_result', JSON.stringify(status.result))
            localStorage.setItem('latest_image_url', imageUrl)
            update({ title:'Done!', pct: 100, sub: 'Opening results…' })
            await sleep(300)
            nav('/results')
        } catch (e) {
            hide()
            console.error(e)
            alert('Failed: ' + (e?.message || e))
        }
    }

    return (
        <>
            <div className="upload-card">
                <div
                    className={'dropzone' + (drag? ' drag':'')}
                    onDragOver={e => { e.preventDefault(); setDrag(true) }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={e => { e.preventDefault(); setDrag(false); select(e.dataTransfer.files?.[0]) }}
                    onClick={() => inputRef.current?.click()}
                >
                    <div style={{ textAlign:'center' }}>
                        <div style={{ fontWeight:800, marginBottom:6 }}>Drag & Drop Your Image or Click to Browse</div>
                        <div className="hint">Supports JPG, PNG, WEBP (max. 50MB)</div>
                        <div className="row" style={{ justifyContent:'center', marginTop:14 }}>
                            <button className="btn-primary" onClick={e => { e.stopPropagation(); inputRef.current?.click() }}>Select Image</button>
                            <input ref={inputRef} type="file" accept={ACCEPT.join(',')} style={{ display:'none' }} onChange={e => select(e.target.files?.[0])} />
                        </div>
                    </div>
                </div>

                <div className="preview-box" style={{ display: preview? 'block':'none' }}>
                    {preview && <img src={preview} alt="preview" />}
                </div>

                <div className="row">
                    <button className="btn-primary" disabled={!file} onClick={startAnalyze}>Analyze Now</button>
                    <button className="btn-ghost" onClick={() => { setFile(null); setPreview(null) }}>Clear</button>
                </div>
                <div className="hint">Tip: we validate type/size locally, then direct-upload to storage before analysis.</div>
            </div>

            {/* overlay */}
            {overlay.show && (
                <div className="overlay" style={{ display:'flex' }}>
                    <div className="panel">
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div className="spinner"></div>
                            <div>
                                <div style={{ fontWeight:800 }}>{overlay.title}</div>
                                <div className="hint">{overlay.desc}</div>
                            </div>
                        </div>
                        <div className="progress"><span style={{ width: overlay.pct + '%' }}></span></div>
                        <div className="hint" style={{ marginTop:6 }}>{overlay.sub}</div>
                    </div>
                </div>
            )}
        </>
    )
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)) }
