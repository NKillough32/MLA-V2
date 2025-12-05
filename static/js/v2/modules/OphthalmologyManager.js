/**
 * OphthalmologyManager.js
 * Lightweight knowledge deck focused on common eye conditions, presentations,
 * diagnostics, and management pathways. Provides rapid reference content for
 * the medical tools panel without needing separate PDF assets.
 */
class OphthalmologyManager {
    constructor() {
        this.sections = this.buildSections();
        this.localImages = this.buildLocalImages();
        // Placeholder image using base64 encoding to avoid escaping issues in HTML attributes
        this.placeholderImage = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bfdbfe" offset="0"/><stop stop-color="#93c5fd" offset="1"/></linearGradient></defs><rect width="400" height="240" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#1d4ed8" font-family="Arial, sans-serif" font-size="18">Image not available</text></svg>');
        this.searchTerm = '';
    }

    async initialize() {
        return Promise.resolve();
    }

    getStatistics() {
        const conditionSection = this.sections.find(s => Array.isArray(s.conditions));
        const totalConditions = conditionSection ? conditionSection.conditions.length : 0;
        return {
            totalSections: this.sections.length,
            totalImages: this.localImages.length,
            totalConditions
        };
    }

    buildLocalImages() {
        // Local images stored in static/assets/ophthalmology/
        const basePath = '/static/assets/ophthalmology/';
        return [
            { filename: 'diabetic-retinopathy.jpg', title: 'Diabetic Retinopathy', category: 'Retina', description: 'Fundus showing scatter laser photocoagulation scars for proliferative diabetic retinopathy', credit: 'Wikimedia Commons (Public Domain)' },
            { filename: 'amd-drusen.jpg', title: 'Age-related Macular Degeneration', category: 'Retina', description: 'Intermediate AMD with drusen deposits in the macula', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'papilloedema.jpg', title: 'Papilloedema', category: 'Optic Nerve', description: 'Bilateral optic disc swelling due to raised intracranial pressure', credit: 'Wikimedia Commons (CC BY 2.0)' },
            { filename: 'cataract.png', title: 'Cataract', category: 'Lens', description: 'Dense nuclear cataract visible through dilated pupil', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'acute-angle-closure.jpg', title: 'Acute Angle Closure Glaucoma', category: 'Glaucoma', description: 'Mid-dilated fixed pupil with corneal oedema in acute angle closure', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'hyphema.jpg', title: 'Hyphema', category: 'Anterior Segment', description: 'Blood layering in the anterior chamber following trauma', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'corneal-ulcer.jpg', title: 'Corneal Ulcer', category: 'Cornea', description: 'Corneal ulcer with stromal infiltrate and epithelial defect', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'dendritic-ulcer.jpg', title: 'Dendritic Ulcer (HSV Keratitis)', category: 'Cornea', description: 'Characteristic branching dendritic pattern with fluorescein staining in herpes simplex keratitis', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'pterygium.jpg', title: 'Pterygium', category: 'Conjunctiva', description: 'Fleshy triangular growth extending from conjunctiva onto cornea', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'subconjunctival-haemorrhage.jpg', title: 'Subconjunctival Haemorrhage', category: 'Conjunctiva', description: 'Bright red blood beneath the conjunctiva, often spontaneous or post-trauma', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'conjunctivitis.jpg', title: 'Conjunctivitis', category: 'Conjunctiva', description: 'Red eye with conjunctival injection and lid swelling', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'episcleritis.jpg', title: 'Episcleritis', category: 'Sclera', description: 'Sectoral redness of episcleral vessels - typically benign and self-limiting', credit: 'Wikimedia Commons (CC BY-SA 4.0)' },
            { filename: 'chalazion.jpg', title: 'Chalazion', category: 'Eyelid', description: 'Painless meibomian gland lipogranuloma in upper eyelid', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'stye.jpg', title: 'Stye (Hordeolum)', category: 'Eyelid', description: 'Acute painful staphylococcal infection of eyelid gland', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'ptosis.jpg', title: 'Ptosis', category: 'Eyelid', description: 'Drooping of the upper eyelid - can be congenital, aponeurotic, or neurogenic', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'orbital-cellulitis.jpg', title: 'Orbital Cellulitis', category: 'Orbit', description: 'Periorbital swelling with proptosis and restricted eye movements - ophthalmological emergency', credit: 'Wikimedia Commons (CC BY-SA 3.0)' },
            { filename: 'herpes-zoster-ophthalmicus.jpg', title: 'Herpes Zoster Ophthalmicus', category: 'Infection', description: 'V1 dermatomal vesicular rash - risk of ocular involvement with Hutchinson sign', credit: 'Wikimedia Commons (CC BY-SA 3.0)' }
        ].map(img => ({ ...img, src: basePath + img.filename }));
    }

    ensureStyles() {
        if (document.getElementById('ophthalmology-styles')) return;

        const css = `
            /* Search box */
            .ophthal-search-container {
                margin-bottom: 20px;
                position: sticky;
                top: 0;
                z-index: 10;
                background: var(--v2-bg-card, #fff);
                padding: 12px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .ophthal-search-input {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid rgba(59,130,246,0.2);
                border-radius: 10px;
                font-size: 1rem;
                background: var(--v2-bg-main, #f8fafc);
                color: var(--v2-text-primary, #0f172a);
                transition: border-color 200ms, box-shadow 200ms;
            }
            .ophthal-search-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
            }
            .ophthal-search-input::placeholder {
                color: #94a3b8;
            }
            .ophthal-search-stats {
                margin-top: 8px;
                font-size: 0.85rem;
                color: #64748b;
            }
            
            /* Card grid */
            .ophthal-card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 18px;
                width: 100%;
            }
            .ophthal-card {
                border-radius: 14px;
                border: 1px solid rgba(15,23,42,0.08);
                background: linear-gradient(135deg, rgba(96,165,250,0.08), rgba(59,130,246,0.04));
                padding: 14px 16px 16px;
                box-shadow: 0 10px 34px rgba(15,23,42,0.06);
                transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
            }
            .ophthal-card:hover {
                transform: translateY(-4px);
                border-color: rgba(59,130,246,0.26);
                box-shadow: 0 14px 46px rgba(15,23,42,0.12);
            }
            .ophthal-card.hidden { display: none; }
            .ophthal-card h3 { margin: 0 0 6px 0; font-size: 1.05rem; letter-spacing: -0.01em; }
            .ophthal-card .card-summary { margin: 0 0 10px 0; color: #475569; line-height: 1.55; }
            .ophthal-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 10px;
                border-radius: 999px;
                background: rgba(59,130,246,0.12);
                border: 1px solid rgba(59,130,246,0.24);
                color: #1d4ed8;
                font-weight: 700;
                font-size: 0.83rem;
                letter-spacing: 0.01em;
                margin-bottom: 8px;
            }
            .ophthal-columns { display: grid; gap: 10px; }
            .ophthal-subsection {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 10px;
                padding: 10px 12px;
                background: #fff;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
            }
            .ophthal-subsection h4 { margin: 0 0 6px 0; font-size: 0.96rem; }
            .ophthal-subsection ul { margin: 0; padding-left: 18px; display: grid; gap: 6px; }
            .ophthal-subsection li { line-height: 1.5; }
            
            /* Image gallery */
            .ophthal-image-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 16px;
                margin-top: 10px;
            }
            .ophthal-image-card {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                overflow: hidden;
                background: #fff;
                display: flex;
                flex-direction: column;
                cursor: pointer;
                transition: transform 180ms, box-shadow 180ms;
            }
            .ophthal-image-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            }
            .ophthal-image-card img { 
                width: 100%; 
                height: 180px; 
                object-fit: cover; 
                display: block;
                background: #f1f5f9;
            }
            .ophthal-image-card .image-meta { 
                padding: 12px; 
                font-size: 0.9rem; 
                color: #0f172a;
            }
            .ophthal-image-card .image-meta strong {
                display: block;
                margin-bottom: 4px;
                color: #1e40af;
            }
            .ophthal-image-card .image-meta .category {
                display: inline-block;
                background: rgba(59,130,246,0.1);
                color: #2563eb;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                margin-bottom: 6px;
            }
            .ophthal-image-card .image-meta .description {
                color: #475569;
                font-size: 0.85rem;
                line-height: 1.4;
            }
            .ophthal-image-card .image-meta .credit {
                color: #94a3b8;
                font-size: 0.75rem;
                margin-top: 6px;
                font-style: italic;
            }
            
            .ophthal-note { margin-top: 8px; color: #475569; font-style: italic; }
            
            /* Condition cards */
            .ophthal-condition-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                gap: 14px; 
            }
            .ophthal-condition-card { 
                border: 1px solid rgba(15,23,42,0.08); 
                border-radius: 12px; 
                padding: 14px 16px; 
                background: #fff; 
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); 
                display: grid; 
                gap: 8px;
                transition: border-color 180ms, box-shadow 180ms;
            }
            .ophthal-condition-card:hover {
                border-color: rgba(59,130,246,0.3);
                box-shadow: 0 4px 12px rgba(59,130,246,0.08);
            }
            .ophthal-condition-card.hidden { display: none; }
            .ophthal-condition-card h4 { 
                margin: 0; 
                font-size: 1.05rem; 
                color: #0f172a;
                border-bottom: 1px solid rgba(15,23,42,0.06);
                padding-bottom: 8px;
            }
            .ophthal-condition-card .condition-section { 
                margin: 0; 
                padding-left: 16px; 
                display: grid; 
                gap: 4px; 
            }
            .ophthal-condition-card strong { 
                color: #1d4ed8; 
                font-size: 0.88rem;
                display: block;
                margin-bottom: 4px;
            }
            .ophthal-condition-card li { line-height: 1.45; font-size: 0.92rem; }

            /* Dark mode - using app's data-theme attribute */
            [data-theme="dark"] .ophthal-search-container {
                background: var(--v2-bg-card, #1e293b);
            }
            [data-theme="dark"] .ophthal-search-input {
                background: var(--v2-bg-elevated, #334155);
                border-color: rgba(148,163,184,0.2);
                color: #f1f5f9;
            }
            [data-theme="dark"] .ophthal-search-input::placeholder {
                color: #64748b;
            }
            [data-theme="dark"] .ophthal-search-stats {
                color: #94a3b8;
            }
            [data-theme="dark"] .ophthal-card { 
                border-color: #334155; 
                background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.06)); 
                box-shadow: 0 12px 32px rgba(0,0,0,0.32); 
            }
            [data-theme="dark"] .ophthal-card .card-summary { color: #cbd5e1; }
            [data-theme="dark"] .ophthal-badge {
                background: rgba(59,130,246,0.2);
                border-color: rgba(59,130,246,0.4);
                color: #93c5fd;
            }
            [data-theme="dark"] .ophthal-subsection { 
                border: 1px solid #475569; 
                background: #1e293b; 
                color: #e2e8f0; 
            }
            [data-theme="dark"] .ophthal-subsection h4 { color: #e2e8f0; }
            [data-theme="dark"] .ophthal-image-card { 
                border-color: #475569; 
                background: #1e293b; 
                color: #e2e8f0; 
            }
            [data-theme="dark"] .ophthal-image-card img {
                background: #334155;
            }
            [data-theme="dark"] .ophthal-image-card .image-meta { color: #e2e8f0; }
            [data-theme="dark"] .ophthal-image-card .image-meta strong { color: #93c5fd; }
            [data-theme="dark"] .ophthal-image-card .image-meta .category {
                background: rgba(59,130,246,0.2);
                color: #93c5fd;
            }
            [data-theme="dark"] .ophthal-image-card .image-meta .description { color: #cbd5e1; }
            [data-theme="dark"] .ophthal-image-card .image-meta .credit { color: #64748b; }
            [data-theme="dark"] .ophthal-note { color: #cbd5e1; }
            [data-theme="dark"] .ophthal-condition-card { 
                border-color: #475569; 
                background: #1e293b; 
                color: #e2e8f0; 
            }
            [data-theme="dark"] .ophthal-condition-card h4 { 
                color: #e2e8f0;
                border-bottom-color: rgba(255,255,255,0.1);
            }
            [data-theme="dark"] .ophthal-condition-card strong { color: #93c5fd; }
            [data-theme="dark"] .ophthal-condition-card li { color: #cbd5e1; }
            
            /* Image modal */
            .ophthal-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.85);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                cursor: zoom-out;
            }
            .ophthal-modal-content {
                max-width: 90vw;
                max-height: 90vh;
                position: relative;
            }
            .ophthal-modal-content img {
                max-width: 100%;
                max-height: 85vh;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            }
            .ophthal-modal-caption {
                color: #fff;
                text-align: center;
                margin-top: 12px;
                font-size: 1rem;
            }
            .ophthal-modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
                padding: 8px;
            }
        `;

        const style = document.createElement('style');
        style.id = 'ophthalmology-styles';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }

    buildSections() {
        return [
            {
                title: 'Ophthalmology Conditions Overview',
                badge: 'Conditions',
                summary: 'Common eye diseases seen in primary care and acute take, plus key rare entities to flag early.',
                columns: [
                    {
                        heading: 'Common conditions',
                        items: [
                            'Cataracts',
                            'Glaucoma (open- and closed-angle)',
                            'Age-related macular degeneration (AMD)',
                            'Diabetic retinopathy',
                            'Retinal detachment and posterior vitreous detachment',
                            'Dry eye disease / blepharitis',
                            'Conjunctivitis (viral, allergic, bacterial)',
                            'Corneal conditions: keratitis, abrasions, foreign body',
                            'Uveitis (anterior/posterior)',
                            'Strabismus and amblyopia',
                            'Keratoconus'
                        ]
                    },
                    {
                        heading: 'Rare / complex',
                        items: [
                            'Retinopathy of prematurity',
                            'Optic neuritis (e.g., demyelination)',
                            'Leber’s hereditary optic neuropathy',
                            'Ocular tumours (uveal melanoma, retinoblastoma)',
                            'Scleritis (often systemic association)',
                            'Inherited retinal dystrophies'
                        ]
                    }
                ]
            },
            {
                title: 'Clinical Presentations',
                badge: 'Symptoms & Signs',
                summary: 'Anchor history and examination around vision changes, ocular surface symptoms, and systemic clues.',
                columns: [
                    {
                        heading: 'Vision related',
                        items: [
                            'Blurred or fluctuating vision (cataract, refractive error, macular disease)',
                            'Loss of peripheral vision (glaucoma, retinal detachment)',
                            'Central scotoma or metamorphopsia (AMD, macular oedema)',
                            'Double vision (diplopia) or oscillopsia',
                            'Transient visual obscurations (papilloedema, vasospasm)'
                        ]
                    },
                    {
                        heading: 'Eye surface / pain',
                        items: [
                            'Redness, discharge, itching (conjunctivitis, allergy)',
                            'Photophobia and periocular pain (uveitis, keratitis, scleritis)',
                            'Foreign body sensation, tearing, gritty discomfort (dry eye, corneal abrasion)',
                            'Headache, nausea/vomiting, haloes around lights (acute angle-closure glaucoma)',
                            'Proptosis, lid swelling, or restricted eye movements (orbital cellulitis, thyroid eye disease)'
                        ]
                    }
                ]
            },
            {
                title: 'Etiology & Risk Factors',
                badge: 'Causes',
                summary: 'Combine systemic risk factor screening with ocular history to triage urgency.',
                columns: [
                    {
                        heading: 'Systemic / environmental',
                        items: [
                            'Diabetes mellitus (retinopathy, cataract, cranial neuropathies)',
                            'Hypertension and vascular disease (retinal vein/artery occlusion)',
                            'Smoking and UV exposure (AMD, pterygium)',
                            'Medications (steroids → cataract/IOP rise; anticholinergics → angle closure risk)',
                            'Trauma or contact lens wear (corneal abrasion, microbial keratitis)'
                        ]
                    },
                    {
                        heading: 'Demographics / genetic',
                        items: [
                            'Ageing population (cataract, AMD, presbyopia)',
                            'Family history of glaucoma or keratoconus',
                            'Prematurity (retinopathy of prematurity)',
                            'Autoimmune disease (uveitis, scleritis)',
                            'Inherited optic neuropathies (Leber)'
                        ]
                    }
                ]
            },
            {
                title: 'Diagnostic Tests & Investigations',
                badge: 'Assessment',
                summary: 'Pair bedside exam with targeted imaging to stratify vision-threatening pathology.',
                columns: [
                    {
                        heading: 'Examination',
                        items: [
                            'Visual acuity with pinhole; colour vision (Ishihara) and pupil reactions (RAPD)',
                            'Slit-lamp with fluorescein staining for cornea/anterior chamber cells or flare',
                            'Fundoscopy / dilated fundus exam for optic disc, macula, vasculature',
                            'Intra-ocular pressure (tonometry) where safe; corneal clarity and depth',
                            'Visual fields (confrontation; automated perimetry for glaucoma)'
                        ]
                    },
                    {
                        heading: 'Imaging / labs',
                        items: [
                            'Optical coherence tomography (OCT) for macula/nerve fibre layer',
                            'Fundus photography (baseline and monitoring, e.g., diabetic eye screening)',
                            'B-scan ultrasound for retinal/vitreous pathology when view is obscured',
                            'Fluorescein angiography for vascular leakage/occlusion',
                            'Bloods for systemic causes (glucose/HbA1c, ESR/CRP, thyroid panel, autoimmune screen)'
                        ]
                    }
                ]
            },
            {
                title: 'Management & Treatment',
                badge: 'Management',
                summary: 'Prioritise vision-saving steps: reduce IOP, suppress inflammation, repair retina, or reverse opacity.',
                columns: [
                    {
                        heading: 'Pharmacological',
                        items: [
                            'Glaucoma drops: prostaglandin analogues, beta-blockers, carbonic anhydrase inhibitors, alpha-agonists',
                            'Topical / systemic corticosteroids for uveitis or post-operative inflammation (monitor IOP)',
                            'Topical antibiotics for bacterial conjunctivitis or corneal ulcer risk in contact lens wearers',
                            'Anti-VEGF intravitreal agents for wet AMD or diabetic macular oedema',
                            'Lubricants, lid hygiene, and anti-allergics for dry eye and allergic conjunctivitis'
                        ]
                    },
                    {
                        heading: 'Procedural / supportive',
                        items: [
                            'Cataract surgery (phacoemulsification with IOL)',
                            'Trabeculectomy / drainage implants or laser (SLT/LPI) for glaucoma',
                            'Retinal laser or vitrectomy for detachment or proliferative diabetic retinopathy',
                            'Corneal cross-linking or specialty lenses for keratoconus; protective eyewear',
                            'Orthoptics / vision therapy for strabismus; low-vision aids and rehab services'
                        ]
                    }
                ]
            },
            {
                title: 'Clinical Guidelines & Referral',
                badge: 'Pathways',
                summary: 'Use clear triggers for urgent ophthalmology input and recognise red-flag timelines.',
                columns: [
                    {
                        heading: 'Guideline anchors',
                        items: [
                            'UK: NICE glaucoma (NG81), AMD (NG82), diabetic eye screening pathways, and cataract surgery criteria',
                            'Royal College of Ophthalmologists emergency pathways (acute angle closure, retinal detachment)',
                            'Local rapid-access macula clinics for new distortion/central vision loss',
                            'Child safeguarding in suspected non-accidental injury with ocular signs'
                        ]
                    },
                    {
                        heading: 'When to refer',
                        items: [
                            'Same-day: sudden vision loss, painful red eye with photophobia, suspected retinal detachment, chemical injury',
                            'Urgent (within days): new metamorphopsia/central blur, flashes/floaters, acute diplopia, corneal ulcer risk',
                            'Routine: stable cataract affecting activities, chronic dry eye refractory to primary measures',
                            'Document baseline acuity, pupils, fields, and IOP (if safe) with time of onset before referral'
                        ]
                    }
                ]
            },
            {
                title: 'Condition Spotlights',
                badge: 'Present · Diagnose · Treat',
                summary: 'Concise pearls for urgent and chronic ophthalmic problems with typical presentation, bedside work-up, and first-line management.',
                conditions: [
                    { name: 'Acute angle-closure glaucoma', presentation: ['Severe ocular pain, haloes, headache, nausea/vomiting', 'Mid-dilated fixed pupil, hazy cornea, hard eye'], diagnosis: ['IOP often >40 mmHg (avoid tonometry if globe rupture suspected)', 'Gonioscopy: closed angle; shallow anterior chamber'], management: ['Acetazolamide PO/IV + topical beta-blocker/alpha-agonist; pilocarpine once IOP falling', 'Urgent ophthalmology review; definitive laser peripheral iridotomy to both eyes'] },
                    { name: 'Age-related macular degeneration', presentation: ['Central blur, metamorphopsia, impaired reading/face recognition', 'Drusen on exam; wet AMD adds distortion or sudden drop'], diagnosis: ['Dilated fundoscopy/OCT for drusen, subretinal fluid, haemorrhage', 'Fluorescein angiography for neovascular changes'], management: ['AREDS2 supplements, smoking cessation; low-vision support', 'Anti-VEGF injections for wet AMD; urgent macula service referral'] },
                    { name: 'Allergic conjunctivitis', presentation: ['Bilateral itch, watering, stringy discharge', 'Cobblestone papillae; chemosis'], diagnosis: ['Clinical; vision preserved; no corneal staining', 'Exclude keratoconus in chronic eye rubbing'], management: ['Cold compresses, lubricants, allergen avoidance', 'Topical antihistamine/mast-cell stabiliser; short steroid course if severe (ophthalmology advised)'] },
                    { name: 'Anterior uveitis', presentation: ['Painful photophobia, blurred vision, perilimbal redness', 'Small/irregular pupil, cells/flare in anterior chamber'], diagnosis: ['Slit-lamp: cells/flare, keratic precipitates; IOP may vary', 'Consider HLA-B27, syphilis, sarcoid screen for recurrent cases'], management: ['Topical steroids and cycloplegic drops per ophthalmology plan', 'Urgent referral; monitor IOP; treat underlying systemic disease'] },
                    { name: 'Argyll-Robertson pupil', presentation: ['Small irregular pupils that accommodate but do not react to light', 'Often bilateral; minimal symptoms'], diagnosis: ['Pupillary light-near dissociation; intact accommodation', 'Investigate for neurosyphilis or diabetes neuropathy'], management: ['Treat underlying cause (e.g., IV penicillin for neurosyphilis)', 'Address systemic risk factors; no specific ocular therapy required'] },
                    { name: 'Blepharitis', presentation: ['Lid margin crusting, gritty eyes, morning stickiness', 'Associated with rosacea/seborrhoea; recurrent chalazia'], diagnosis: ['Clinical lid margin debris, telangiectasia, collarettes', 'Rule out Demodex or meibomian gland dysfunction'], management: ['Lid hygiene (warm compresses, scrubs), lubricants', 'Topical antibiotic ointment if staph overgrowth; oral doxycycline for rosacea-related disease'] },
                    { name: 'Blurred vision', presentation: ['Gradual (refractive error, cataract, AMD) vs sudden (vascular occlusion, retinal detachment)', 'May be unilateral or bilateral; ask about pain/photophobia'], diagnosis: ['Visual acuity with pinhole, fields, pupils (RAPD), fundus exam', 'OCT/retinal imaging if macular or nerve pathology suspected'], management: ['Urgent referral for painful/sudden loss; safety-net for flashes/floaters', 'Correct refractive error; treat underlying cause (e.g., cataract surgery, anti-VEGF, IOP lowering)'] },
                    { name: 'Cataracts', presentation: ['Painless progressive blur, glare, faded colours, monocular diplopia', 'Reduced red reflex; nuclear, cortical, or posterior subcapsular changes'], diagnosis: ['Visual acuity, slit-lamp lens exam; dilated assessment', 'Biometry pre-surgery; rule out amblyopia or retinal disease'], management: ['Lifestyle/lighting optimisation until surgery indicated', 'Phacoemulsification with intraocular lens; post-op steroid + antibiotic drops'] },
                    { name: 'Central retinal artery occlusion', presentation: ['Sudden profound monocular vision loss, RAPD', 'Pale retina with cherry-red spot'], diagnosis: ['Urgent fundoscopy/OCT; consider ocular massage while arranging care', 'Stroke work-up: ECG, carotid imaging, inflammatory markers for GCA >50y'], management: ['Immediate stroke/ophthalmology activation; ocular massage if within minutes', 'IV acetazolamide, anterior chamber paracentesis per ophthalmology; secondary prevention (antiplatelet, vascular risk)'] },
                    { name: 'Central retinal vein occlusion', presentation: ['Subacute painless vision loss, often on waking', 'Blood and thunder retina with widespread haemorrhages'], diagnosis: ['Fundoscopy/OCT for macular oedema; IOP check; BP/glucose screen', 'Thrombophilia/vasculitis work-up in young patients'], management: ['Urgent ophthalmology for anti-VEGF or steroid implant if macular oedema', 'Treat IOP if neovascularisation; optimise vascular risk factors'] },
                    { name: 'Corneal abrasion', presentation: ['Acute severe foreign body sensation, photophobia, tearing', 'Pain relieved by topical anaesthetic in clinic'], diagnosis: ['Fluorescein staining highlights epithelial defect', 'Evert lids to exclude foreign body; check no full-thickness injury'], management: ['Topical antibiotic prophylaxis (chloramphenicol) and lubricants', 'Avoid contact lenses until healed; urgent review if vision drop/keratitis signs'] },
                    { name: 'Corneal foreign body', presentation: ['Foreign body sensation after drilling, grinding, gardening', 'Possible rust ring; tearing and photophobia'], diagnosis: ['Fluorescein staining; lid eversion; consider Seidel test for leak', 'Assess for penetrating injury; orbital X-ray/CT if high-velocity'], management: ['Topical anaesthetic in clinic, remove with cotton bud/needle if superficial; rust ring removal next day if needed', 'Topical antibiotic, tetanus update, safety goggles counselling; urgent ophthalmology for penetrating injury'] },
                    { name: 'Corneal ulcer', presentation: ['Painful red eye, photophobia, purulent discharge', 'Corneal infiltrate with overlying epithelial defect'], diagnosis: ['Fluorescein staining; slit-lamp for stromal infiltrate/hypopyon', 'Corneal scrape for microscopy/culture; consider contact lens-related organisms'], management: ['Urgent ophthalmology; intensive topical fortified antibiotics', 'Avoid steroids until specialist review; cycloplegia for comfort'] },
                    { name: 'Diabetic retinopathy', presentation: ['Often asymptomatic until macular oedema or vitreous haemorrhage', 'Floaters, blurred vision, or scotoma in advanced disease'], diagnosis: ['Retinal photography screening; OCT for macular oedema', 'Fluorescein angiography for proliferative disease'], management: ['Tight glycaemic, BP, lipid control; smoking cessation', 'Panretinal photocoagulation or anti-VEGF for proliferative/macular disease; vitrectomy for non-clearing VH'] },
                    { name: 'Dry eyes', presentation: ['Gritty/burning sensation, fluctuating vision, worse with screens', 'Punctate epithelial erosions on staining'], diagnosis: ['Tear break-up time, Schirmer testing if severe', 'Check lids/meibomian glands and medication history (anticholinergics)'], management: ['Lubricant drops/gel; environmental modification, blink breaks', 'Lid hygiene, omega-3 supplementation; short topical steroid/cyclosporine for refractory disease'] },
                    { name: 'Episcleritis', presentation: ['Mild sectoral redness, discomfort not severe', 'Normal vision; vessels blanch with phenylephrine'], diagnosis: ['Clinical; rule out scleritis (painful, deeper vessels)', 'Screen for systemic associations if recurrent (IBD, RA)'], management: ['Lubricants, cold compresses; topical NSAID', 'Short oral NSAID if needed; reassure benign course'] },
                    { name: 'Eyelid problems', presentation: ['Stye/chalazion lumps, ptosis, entropion/ectropion irritation', 'Blepharospasm or lagophthalmos causing exposure symptoms'], diagnosis: ['Eyelid position/function exam; corneal staining for exposure', 'Consider neurogenic ptosis (Horner’s, III nerve palsy) or masses'], management: ['Warm compresses and lid hygiene; lubricants for exposure', 'Ophthalmology for surgery (entropion/ectropion/ptosis) or botulinum toxin in blepharospasm'] },
                    { name: 'Herpes simplex keratitis', presentation: ['Unilateral painful red eye, photophobia, watery discharge', 'Dendritic fluorescein staining; reduced corneal sensation'], diagnosis: ['Slit-lamp with fluorescein/rose bengal; consider HSV PCR if atypical', 'Avoid topical steroids unless under specialist supervision'], management: ['Topical aciclovir 5x/day 5–10 days; cycloplegia for comfort', 'Urgent ophthalmology; prophylactic oral antivirals for recurrent disease'] },
                    { name: 'Herpes zoster ophthalmicus', presentation: ['Dermatomal V1 rash ± Hutchinson sign; ocular pain/redness', 'May cause keratitis, uveitis, raised IOP'], diagnosis: ['Clinical with corneal staining/IOP check; slit-lamp for uveitis', 'Consider PCR if uncertain; assess for immunosuppression'], management: ['Oral aciclovir/valaciclovir within 72h; analgesia', 'Lubricants; topical steroids/cycloplegics per ophthalmology; monitor IOP'] },
                    { name: 'Holmes-Adie pupil', presentation: ['Unilateral dilated pupil with slow/tonic response to light', 'Light-near dissociation; may have absent reflexes'], diagnosis: ['Pupil constricts with dilute pilocarpine (supersensitivity test)', 'Exclude compressive third nerve palsy or pharmacologic mydriasis'], management: ['Reassure benign; sunglasses for photophobia', 'Pilocarpine drops occasionally for near tasks'] },
                    { name: 'Horner\'s syndrome', presentation: ['Ptosis, miosis, anhidrosis; possibly heterochromia in congenital cases', 'May have neck/arm pain if dissection'], diagnosis: ['Anisocoria greater in dark; apraclonidine test reverses miosis', 'Urgent imaging for carotid dissection; MRI chest/neck for mass'], management: ['Treat underlying lesion (dissection anticoagulation, tumour removal)', 'Artificial tears for mild ptosis exposure; neurology/ophthalmology follow-up'] },
                    { name: 'Hypertensive retinopathy', presentation: ['Often asymptomatic; may have headache or visual blur', 'Arteriolar narrowing, AV nicking, cotton wool spots; papilloedema in malignant HTN'], diagnosis: ['Fundoscopy grading; BP measurement; consider OCT if macular oedema', 'Rule out malignant hypertension emergency'], management: ['Gradual BP control unless hypertensive emergency (then IV management)', 'Refer if macular oedema/papilloedema; monitor vision and BP control'] },
                    { name: 'Infective conjunctivitis', presentation: ['Red sticky eye, purulent discharge, mild irritation', 'Usually bilateral sequentially; vision largely preserved'], diagnosis: ['Clinical; fluorescein to rule out keratitis if pain/photophobia', 'Swab if hyperacute, neonatal, or not responding'], management: ['Topical antibiotic (chloramphenicol or fusidic acid), hygiene advice', 'Urgent referral for severe pain, reduced vision, or contact lens wearers (pseudomonas risk)'] },
                    { name: 'Keratitis', presentation: ['Painful red eye, photophobia, decreased vision', 'Corneal infiltrate; may be herpetic or bacterial'], diagnosis: ['Slit-lamp with fluorescein; corneal scrape if ulcer/infiltrate', 'Risk factors: contact lens wear, trauma, immunosuppression'], management: ['Urgent ophthalmology; intensive topical antibiotics or antivirals', 'Cycloplegia for comfort; avoid steroids unless specialist guided'] },
                    { name: 'Mydriasis', presentation: ['Dilated pupil ± blurry near vision, glare', 'May be pharmacologic, third nerve palsy, or trauma'], diagnosis: ['Check extraocular movements/ptosis for third nerve palsy; pupil reaction testing', 'Medication/plant exposure history; neuroimaging if neurological signs'], management: ['Stop offending agents; treat underlying neurological cause urgently', 'Protect eye from light; temporary pilocarpine sometimes used if pharmacologic not suspected'] },
                    { name: 'Nasolacrimal duct obstruction', presentation: ['Epiphora, recurrent conjunctivitis or dacryocystitis', 'Mucous reflux on sac pressure'], diagnosis: ['Dye disappearance test; syringing/probing in clinic', 'Consider congenital vs acquired causes'], management: ['Massage in infants; topical antibiotics for infection', 'Dacryocystorhinostomy for persistent adult obstruction'] },
                    { name: 'Ocular trauma', presentation: ['Pain, photophobia, reduced vision after blunt/penetrating injury', 'Hyphema, irregular pupil, subconjunctival haemorrhage, globe rupture signs'], diagnosis: ['Assess vision, pupils, RAPD; Seidel test; avoid pressure if rupture suspected', 'CT orbit for fractures/IOFB; tetanus status'], management: ['Shield eye, nil by mouth, urgent ophthalmology; avoid topical drops if rupture suspected', 'Analgesia/antiemetics; prophylactic antibiotics if open globe; manage hyphema with IOP monitoring'] },
                    { name: 'Optic neuritis', presentation: ['Subacute painful loss of vision, worse with eye movements', 'Reduced colour vision, RAPD'], diagnosis: ['Visual acuity/colour vision testing; visual fields; MRI brain/orbits for demyelination', 'Exclude compressive or infectious causes; consider lumbar puncture if atypical'], management: ['IV methylprednisolone for acute optic neuritis; neurology follow-up', 'Discuss risk of MS; counsel on recurrence and urgent review for new symptoms'] },
                    { name: 'Orbital cellulitis', presentation: ['Painful swollen eyelid with fever, proptosis, ophthalmoplegia', 'Reduced vision/RAPD possible'], diagnosis: ['CT orbit/sinuses to differentiate preseptal vs orbital', 'Blood cultures; ENT review for sinus source'], management: ['Urgent IV antibiotics (broad-spectrum incl. MRSA depending on local policy)', 'Ophthalmology/ENT co-management; surgical drainage if abscess or deteriorating'] },
                    { name: 'Papilloedema', presentation: ['Transient visual obscurations, headache, pulsatile tinnitus', 'Bilateral swollen optic discs'], diagnosis: ['Urgent neuro exam; MRI/MRV to exclude mass/venous thrombosis', 'Lumbar puncture for opening pressure after imaging'], management: ['Treat intracranial hypertension (weight loss, acetazolamide)', 'Neurosurgical options (CSF shunt/optic nerve sheath fenestration) if progressive'] },
                    { name: 'Posterior vitreous detachment', presentation: ['Sudden onset floaters and flashes; curtain absent', 'Usually vision preserved; Weiss ring on exam'], diagnosis: ['Dilated fundus exam to exclude retinal tear/detachment', 'B-scan ultrasound if view poor'], management: ['Safety-net for new flashes/floaters or vision loss; avoid heavy lifting short term', 'Urgent review if new field defect suggesting tear/detachment'] },
                    { name: 'Preseptal cellulitis', presentation: ['Eyelid erythema/swelling without pain on eye movements or proptosis', 'Vision and motility normal'], diagnosis: ['Differentiate from orbital cellulitis; vital to assess EOM and vision', 'Consider systemic infection markers; sinus involvement'], management: ['Oral antibiotics and close review', 'Escalate to IV/CT if systemic features or diagnostic uncertainty'] },
                    { name: 'Primary open-angle glaucoma: presentation and diagnosis', presentation: ['Usually asymptomatic until field loss; may have family history', 'Increased cup-to-disc ratio, nasal step/arcuate field defects'], diagnosis: ['IOP measurement, gonioscopy open angle, OCT RNFL thinning', 'Automated perimetry for visual fields; pachymetry for corneal thickness'], management: ['Educate chronic nature; adherence to drops', 'Arrange baseline imaging/fields and follow-up with ophthalmology'] },
                    { name: 'Primary open-angle glaucoma: management', presentation: ['Chronic progressive optic neuropathy with open angles', 'Often discovered on screening or optometry referral'], diagnosis: ['Baseline fields/OCT and IOP establish target pressure', 'Assess adherence and side effects of drops'], management: ['First-line prostaglandin analogue; add beta-blocker/CAI/alpha-agonist as needed', 'Laser trabeculoplasty or trabeculectomy/minimally invasive glaucoma surgery if uncontrolled'] },
                    { name: 'Red eye', presentation: ['Non-specific redness; assess pain, photophobia, discharge, vision', 'Check contact lens use, trauma, systemic symptoms'], diagnosis: ['Differentiate conjunctivitis vs keratitis/uveitis/scleritis vs glaucoma', 'Fluorescein staining, IOP (if safe), pupil exam, corneal clarity'], management: ['Treat based on cause; safety-net for pain/photophobia/vision drop', 'Avoid steroid drops unless specialist guided; refer if unsure'] },
                    { name: 'Relative afferent pupillary defect', presentation: ['Asymmetric pupil light response; dimming when swinging flashlight to affected eye', 'Often associated with optic neuritis, severe retinal disease'], diagnosis: ['Swinging flashlight test showing dilation on affected side', 'Find underlying cause (optic neuropathy, retinal detachment/artery occlusion)'], management: ['Manage underlying pathology urgently if acute', 'Document baseline; essential prognostic sign for optic nerve/retina recovery'] },
                    { name: 'Retinal detachment', presentation: ['Flashes/floaters with curtain or shadow, painless vision loss', 'Field defect progressing centrally'], diagnosis: ['Dilated fundus exam; B-scan if media opacity', 'Assess macula-on vs macula-off status urgently'], management: ['Same-day ophthalmology/surgical repair (laser/cryotherapy, vitrectomy, buckle)', 'Post-op positioning advice; counsel on fellow-eye risk'] },
                    { name: 'Retinitis pigmentosa', presentation: ['Night blindness, peripheral field loss, photopsias', 'Bone-spicule pigmentation, attenuated vessels'], diagnosis: ['Visual fields, ERG, genetic testing', 'Monitor for cataract/CME; family counselling'], management: ['Low-vision support; vitamin A only under specialist guidance', 'Manage complications (cataract surgery, carbonic anhydrase inhibitors for CME)'] },
                    { name: 'Rheumatoid arthritis: ocular manifestations', presentation: ['Dry eye, episcleritis/scleritis, peripheral ulcerative keratitis', 'Painful red eye or melt risk in active disease'], diagnosis: ['Slit-lamp for peripheral thinning/melt; tear tests for sicca', 'Coordinate with rheumatology; inflammatory markers'], management: ['Aggressive lubrication; topical steroids for episcleritis/scleritis under specialist care', 'Systemic immunosuppression for scleritis/PUK; protect cornea'] },
                    { name: 'Scleritis', presentation: ['Severe boring eye pain, worse at night/eye movements', 'Violaceous scleral hue; may have decreased vision'], diagnosis: ['Does not blanch with phenylephrine; deep vessel involvement', 'Screen for systemic autoimmune disease (RA, GPA)'], management: ['Urgent ophthalmology; systemic NSAIDs then steroids/immunosuppression', 'Protect eye; monitor for thinning/perforation'] },
                    { name: 'Squint', presentation: ['Eye misalignment causing diplopia or amblyopia risk', 'May be concomitant or paralytic'], diagnosis: ['Cover test, ocular motility exam; refractive assessment', 'Consider neurological causes if acute onset in adults'], management: ['Correct refractive error; occlusion therapy for amblyopia in children', 'Orthoptic exercises or surgery/botulinum toxin for persistent deviation'] },
                    { name: 'Sudden loss of vision', presentation: ['Painless (CRAO/CRVO, vitreous haemorrhage, retinal detachment) vs painful (optic neuritis, AACG)', 'May include field defect, RAPD'], diagnosis: ['Immediate acuity, pupils, fields, fundoscopy; IOP if safe', 'Point-of-care B-scan if media opaque; urgent systemic work-up as indicated'], management: ['Same-day ophthalmology/stroke team depending on cause', 'Avoid delay—time-sensitive for CRAO, retinal tear repair, AACG pressure lowering'] },
                    { name: 'Vitreous haemorrhage', presentation: ['Sudden floaters, cobwebs, or hazy vision', 'Reduced red reflex; obscured fundus view'], diagnosis: ['B-scan ultrasound to exclude retinal detachment', 'Check HbA1c/BP for diabetic or hypertensive causes'], management: ['Head elevation, avoid strenuous activity; stop anticoagulation only if advised', 'Urgent retinal review; vitrectomy if non-clearing or retinal tear present'] }
                ]
            },
            {
                title: 'Complications & Prognosis',
                badge: 'Outcomes',
                summary: 'Outline potential vision loss scenarios to reinforce early detection and adherence.',
                columns: [
                    {
                        heading: 'Potential complications',
                        items: [
                            'Permanent vision loss from untreated glaucoma, retinal detachment, or severe AMD',
                            'Macular scarring or neovascular glaucoma in proliferative diabetic retinopathy',
                            'Corneal perforation or scarring after microbial keratitis or untreated uveitis',
                            'Amblyopia if strabismus or refractive error not corrected early'
                        ]
                    },
                    {
                        heading: 'Prognosis pointers',
                        items: [
                            'Early surgery yields excellent cataract outcomes; delayed cases risk falls and anisometropia symptoms',
                            'IOP control slows glaucoma progression but requires adherence and monitoring visual fields/OCT',
                            'Anti-VEGF stabilises many wet AMD cases; emphasize follow-up for reactivation',
                            'Tight glycaemic and blood pressure control reduces diabetic eye disease progression'
                        ]
                    }
                ]
            }
        ];
    }

    filterConditions(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase().trim();
        const conditionCards = document.querySelectorAll('.ophthal-condition-card');
        let visibleCount = 0;
        
        conditionCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const matches = !this.searchTerm || text.includes(this.searchTerm);
            card.classList.toggle('hidden', !matches);
            if (matches) visibleCount++;
        });
        
        // Update stats
        const statsEl = document.querySelector('.ophthal-search-stats');
        if (statsEl) {
            const total = conditionCards.length;
            if (this.searchTerm) {
                statsEl.textContent = `Showing ${visibleCount} of ${total} conditions`;
            } else {
                statsEl.textContent = `${total} conditions available`;
            }
        }
    }

    openImageModal(image) {
        // Remove existing modal
        const existing = document.querySelector('.ophthal-modal-overlay');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.className = 'ophthal-modal-overlay';
        modal.innerHTML = `
            <div class="ophthal-modal-content">
                <button class="ophthal-modal-close">&times;</button>
                <img src="${image.src}" alt="${image.title}" onerror="this.onerror=null; this.src='${this.placeholderImage}'">
                <div class="ophthal-modal-caption">
                    <strong>${image.title}</strong><br>
                    ${image.description}<br>
                    <small>${image.credit}</small>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('ophthal-modal-close')) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }

    render(container) {
        if (!container) return;
        this.ensureStyles();

        // Search box HTML
        const searchHtml = `
            <div class="ophthal-search-container">
                <input type="text" class="ophthal-search-input" placeholder="🔍 Search conditions (e.g., glaucoma, red eye, uveitis...)" />
                <div class="ophthal-search-stats">${this.sections.find(s => s.conditions)?.conditions.length || 0} conditions available</div>
            </div>
        `;

        // Local images gallery HTML
        const imageGalleryHtml = `
            <article class="ophthal-card">
                <span class="ophthal-badge">📷 Clinical Images</span>
                <h3>Teaching Image Gallery</h3>
                <p class="card-summary">Click any image to enlarge. All images are from Wikimedia Commons under Creative Commons licenses.</p>
                <div class="ophthal-image-grid">
                    ${this.localImages.map((img, idx) => `
                        <figure class="ophthal-image-card" data-image-idx="${idx}">
                            <img src="${img.src}" alt="${img.title}" loading="lazy" onerror="this.onerror=null; this.src='${this.placeholderImage}'">
                            <figcaption class="image-meta">
                                <span class="category">${img.category}</span>
                                <strong>${img.title}</strong>
                                <div class="description">${img.description}</div>
                                <div class="credit">${img.credit}</div>
                            </figcaption>
                        </figure>
                    `).join('')}
                </div>
            </article>
        `;

        const sectionHtml = this.sections.map(section => {
            const badge = `<span class="ophthal-badge">${section.badge}</span>`;
            const summary = section.summary ? `<p class="card-summary">${section.summary}</p>` : '';

            let body = '';
            if (Array.isArray(section.columns)) {
                const columns = section.columns.map(col => `
                    <div class="ophthal-subsection">
                        <h4>${col.heading}</h4>
                        <ul>${(col.items || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                `).join('');
                body = `<div class="ophthal-columns">${columns}</div>`;
            }

            if (Array.isArray(section.conditions)) {
                const conditionCards = section.conditions.map(condition => {
                    const presentation = (condition.presentation || []).map(item => `<li>${item}</li>`).join('');
                    const diagnosis = (condition.diagnosis || []).map(item => `<li>${item}</li>`).join('');
                    const management = (condition.management || []).map(item => `<li>${item}</li>`).join('');

                    return `
                        <div class="ophthal-condition-card">
                            <h4>${condition.name}</h4>
                            <ul class="condition-section"><strong>Presentation</strong>${presentation}</ul>
                            <ul class="condition-section"><strong>Diagnosis</strong>${diagnosis}</ul>
                            <ul class="condition-section"><strong>Treatment</strong>${management}</ul>
                        </div>
                    `;
                }).join('');

                body += `<div class="ophthal-condition-grid">${conditionCards}</div>`;
            }

            const note = section.note ? `<div class="ophthal-note">${section.note}</div>` : '';

            return `
                <article class="ophthal-card">
                    ${badge}
                    <h3>${section.title}</h3>
                    ${summary}
                    ${body}
                    ${note}
                </article>
            `;
        }).join('');

        // Combine: search box, image gallery, then section cards
        container.innerHTML = `
            ${searchHtml}
            ${imageGalleryHtml}
            <div class="ophthal-card-grid">${sectionHtml}</div>
        `;

        // Bind search functionality
        const searchInput = container.querySelector('.ophthal-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterConditions(e.target.value);
            });
        }

        // Bind image click to open modal
        const imageCards = container.querySelectorAll('.ophthal-image-card[data-image-idx]');
        imageCards.forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.imageIdx, 10);
                if (this.localImages[idx]) {
                    this.openImageModal(this.localImages[idx]);
                }
            });
        });
    }
}

export const ophthalmologyManager = new OphthalmologyManager();
export default ophthalmologyManager;