/**
 * OphthalmologyManager.js
 * Lightweight knowledge deck focused on common eye conditions, presentations,
 * diagnostics, and management pathways. Provides rapid reference content for
 * the medical tools panel without needing separate PDF assets.
 */
class OphthalmologyManager {
    constructor() {
        this.sections = this.buildSections();
        this.placeholderImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240" role="img" aria-label="Ophthalmology image placeholder"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="%23bfdbfe" offset="0"/><stop stop-color="%2393c5fd" offset="1"/></linearGradient></defs><rect width="400" height="240" fill="url(%23g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%231d4ed8" font-family="Arial, sans-serif" font-size="18">Ophthalmology</text></svg>';
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
            .ophthal-condition-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
            .ophthal-condition-card { border: 1px solid rgba(15,23,42,0.08); border-radius: 12px; padding: 10px 12px; background: #fff; box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); display: grid; gap: 6px; }
            .ophthal-condition-card h4 { margin: 0; font-size: 1rem; color: #0f172a; }
            .ophthal-condition-card .condition-section { margin: 0; padding-left: 16px; display: grid; gap: 4px; }
            .ophthal-condition-card strong { color: #1d4ed8; font-size: 0.92rem; }
            .ophthal-condition-card li { line-height: 1.45; }

            @media (prefers-color-scheme: dark) {
                .ophthal-card { border-color: #2e2e2e; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.06)); box-shadow: 0 12px 32px rgba(0,0,0,0.32); }
                .ophthal-card .card-summary { color: #cbd5e1; }
                .ophthal-subsection { border: 1px solid #303030; background: #1c1c1c; color: #e2e8f0; }
                .ophthal-subsection h4 { color: #e2e8f0; }
                .ophthal-image-card { border-color: #303030; background: #1c1c1c; color: #e2e8f0; }
                .ophthal-image-card .image-meta { color: #e2e8f0; }
                .ophthal-note { color: #cbd5e1; }
                .ophthal-condition-card { border-color: #303030; background: #1c1c1c; color: #e2e8f0; }
                .ophthal-condition-card h4 { color: #e2e8f0; }
                .ophthal-condition-card strong { color: #93c5fd; }
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
                        <img src="${image.src}" alt="${image.alt}" loading="lazy" onerror="this.onerror=null; this.src='${this.placeholderImage}'">
                        <figcaption class="image-meta">
                            <strong>${image.title}</strong><br>
                            <span>${image.credit}</span>
                        </figcaption>
                    </figure>
                `).join('');
                body += `<div class="ophthal-image-grid">${images}</div>`;
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

        container.innerHTML = `<div class="ophthal-card-grid">${sectionHtml}</div>`;
    }
}

export const ophthalmologyManager = new OphthalmologyManager();
export default ophthalmologyManager;
