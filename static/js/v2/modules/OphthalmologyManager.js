/**
 * OphthalmologyManager.js
 * Lightweight knowledge deck focused on common eye conditions, presentations,
 * diagnostics, and management pathways. Provides rapid reference content for
 * the medical tools panel without needing separate PDF assets.
 */
class OphthalmologyManager {
    constructor() {
        this.sections = this.buildSections();
    }

    async initialize() {
        return Promise.resolve();
    }

    getStatistics() {
        const imageSection = this.sections.find(section => Array.isArray(section.images));
        const totalImages = imageSection ? imageSection.images.length : 0;
        return {
            totalSections: this.sections.length,
            totalImages
        };
    }

    ensureStyles() {
        if (document.getElementById('ophthalmology-styles')) return;

        const css = `
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
            .ophthal-image-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 10px;
            }
            .ophthal-image-card {
                border: 1px solid rgba(15,23,42,0.08);
                border-radius: 12px;
                overflow: hidden;
                background: #fff;
                display: flex;
                flex-direction: column;
            }
            .ophthal-image-card img { width: 100%; height: 140px; object-fit: cover; display: block; }
            .ophthal-image-card .image-meta { padding: 10px; font-size: 0.9rem; color: #0f172a; }
            .ophthal-note { margin-top: 8px; color: #475569; font-style: italic; }

            @media (prefers-color-scheme: dark) {
                .ophthal-card { border-color: #2e2e2e; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.06)); box-shadow: 0 12px 32px rgba(0,0,0,0.32); }
                .ophthal-card .card-summary { color: #cbd5e1; }
                .ophthal-subsection { border: 1px solid #303030; background: #1c1c1c; color: #e2e8f0; }
                .ophthal-subsection h4 { color: #e2e8f0; }
                .ophthal-image-card { border-color: #303030; background: #1c1c1c; color: #e2e8f0; }
                .ophthal-image-card .image-meta { color: #e2e8f0; }
                .ophthal-note { color: #cbd5e1; }
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
            },
            {
                title: 'Open-Access Teaching Images',
                badge: 'Images',
                summary: 'Free-to-use reference photos; always retain attribution and verify licence before reuse.',
                images: [
                    {
                        title: 'Fundus photo – diabetic retinopathy',
                        src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Diabetic_retinopathy.jpg',
                        credit: 'Wikimedia Commons (CC BY-SA 3.0)',
                        alt: 'Fundus photograph showing diabetic retinopathy with multiple dot-blot haemorrhages'
                    },
                    {
                        title: 'Optic disc – glaucoma cupping',
                        src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Glaucoma_cupping.jpg',
                        credit: 'Wikimedia Commons (CC BY 3.0)',
                        alt: 'Optic disc photograph demonstrating glaucomatous cupping with enlarged cup-to-disc ratio'
                    },
                    {
                        title: 'Cornea – keratoconus topography',
                        src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Keratoconus_cornea.png',
                        credit: 'Wikimedia Commons (CC BY-SA 4.0)',
                        alt: 'Colour-coded corneal topography map indicating keratoconus with inferior steepening'
                    }
                ],
                note: 'Links reference openly licensed assets—check the stated Creative Commons terms for local reuse policies.'
            }
        ];
    }

    render(container) {
        if (!container) return;
        this.ensureStyles();

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

            if (Array.isArray(section.images)) {
                const images = section.images.map(image => `
                    <figure class="ophthal-image-card">
                        <img src="${image.src}" alt="${image.alt}">
                        <figcaption class="image-meta">
                            <strong>${image.title}</strong><br>
                            <span>${image.credit}</span>
                        </figcaption>
                    </figure>
                `).join('');
                body += `<div class="ophthal-image-grid">${images}</div>`;
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

        container.innerHTML = `<div class="ophthal-card-grid">${sectionHtml}</div>`;
    }
}

export const ophthalmologyManager = new OphthalmologyManager();
export default ophthalmologyManager;
