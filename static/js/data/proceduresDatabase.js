// Clinical Procedures Database for MLA Quiz PWA
// Comprehensive guide to common medical procedures

window.proceduresDatabase = {
    // ============================================
    // RESPIRATORY PROCEDURES
    // ============================================
    'arterial-line': {
        name: 'Arterial Line Insertion',
        category: 'respiratory',
        indication: 'Continuous BP monitoring, frequent ABG sampling, haemodynamic instability, vasopressor therapy',
        contraindications: 'Inadequate collateral circulation (abnormal Allen test), severe peripheral vascular disease, infection at insertion site, coagulopathy (relative)',
        equipment: ['Sterile gloves, gown, drape', 'Chlorhexidine antiseptic', 'Local anaesthetic (1% lidocaine)', 'Arterial catheter (20G)', 'Guidewire (Seldinger technique)', 'Pressure transducer system', 'Suture material', 'Transparent dressing'],
        procedure: [
            'Patient position: Supine, wrist extended (radial) or arm abducted (femoral)',
            'Perform Allen test if radial approach (confirm ulnar collateral flow)',
            'Identify landmarks: Radial artery at wrist, femoral below inguinal ligament, brachial in antecubital fossa',
            'Aseptic technique: Hand hygiene, full barrier precautions',
            'Infiltrate local anaesthetic (avoid intraarterial injection)',
            'Palpate artery and insert catheter at 30-45° angle',
            'Advance until flashback of pulsatile bright red blood',
            'Thread catheter over needle/guidewire (Seldinger technique)',
            'Remove needle/wire, connect to pressure transducer',
            'Secure with suture and transparent dressing',
            'Zero transducer at phlebostatic axis, confirm arterial waveform',
            'Document site, time, complications'
        ],
        complications: {
            'Immediate': 'Bleeding, haematoma, arterial spasm, inadvertent venous cannulation',
            'Early': 'Thrombosis, distal ischaemia, nerve injury, infection',
            'Late': 'Pseudoaneurysm, AV fistula, compartment syndrome'
        },
        monitoring: 'Check distal perfusion (capillary refill, colour, temperature) hourly. Flush line regularly to prevent thrombosis. Remove as soon as no longer indicated',
        clinicalPearls: 'Radial artery preferred (low complication rate). Allen test mandatory before radial cannulation. Ultrasound guidance reduces attempts and complications. Avoid brachial artery (end artery - ischaemia risk higher)',
        supervision: 'Direct supervision required for foundation doctors'
    },

    'central-line': {
        name: 'Central Venous Catheter Insertion',
        category: 'respiratory',
        indication: 'Vasopressor/inotrope infusion, TPN, haemodialysis, difficult IV access, CVP monitoring, frequent blood sampling',
        contraindications: 'Infection at insertion site, coagulopathy (INR >1.5, platelets <50 - correct first), previous surgery/radiotherapy to site',
        sites: {
            'Internal Jugular': 'First choice - low pneumothorax risk, easily compressible, ultrasound-guided',
            'Subclavian': 'Comfortable for patient, low infection rate, but higher pneumothorax risk',
            'Femoral': 'Easy access, useful in emergency, but higher infection/DVT risk'
        },
        equipment: ['CVC kit (triple lumen common)', 'Ultrasound machine with sterile probe cover', 'Full sterile drapes and gown', 'Chlorhexidine 2%', 'Local anaesthetic', 'Guidewire, dilator, catheter', 'Suture and dressing'],
        procedure: [
            'Obtain consent, explain risks (pneumothorax, bleeding, infection)',
            'Position patient: Trendelenburg (head down 15°) to fill veins and prevent air embolism',
            'Full aseptic technique: Hat, mask, sterile gown, gloves, full drape',
            'Ultrasound scan to identify vein and exclude thrombus',
            'Infiltrate local anaesthetic',
            'Insert needle under ultrasound guidance (short axis or long axis)',
            'Confirm venous blood (dark, non-pulsatile)',
            'Seldinger technique: Pass guidewire through needle',
            'Remove needle, make small skin incision',
            'Pass dilator over wire, then remove dilator',
            'Thread CVC over wire, remove wire',
            'Aspirate and flush all lumens',
            'Secure with suture, apply sterile dressing',
            'Post-procedure CXR to confirm position and exclude pneumothorax',
            'Document: site, date, indication, lumens, complications'
        ],
        complications: {
            'During insertion': 'Arterial puncture (pulsatile bright red blood - remove immediately, apply pressure 10min), pneumothorax, haemothorax, air embolism, arrhythmia',
            'Early': 'Line sepsis (CRBSI), thrombosis, malposition',
            'Late': 'SVC stenosis, line fracture/migration'
        },
        monitoring: 'Daily review of need (remove ASAP). Check insertion site for erythema, tenderness. Replace dressing weekly or if soiled. Blood cultures if fever',
        clinicalPearls: 'ALWAYS use ultrasound guidance (reduces complications). IJ preferred over subclavian (fewer complications). CXR mandatory post-insertion. Tip should be in SVC/RA junction. Remove within 24h if not essential',
        supervision: 'Direct supervision required until competent (usually >10 supervised insertions)'
    },

    'chest-drain': {
        name: 'Chest Drain Insertion',
        category: 'respiratory',
        indication: 'Pneumothorax (>2cm or symptomatic), haemothorax, pleural effusion (large/symptomatic), empyema, chylothorax',
        contraindications: 'Pulmonary bullae adjacent to insertion site, bleeding diathesis (relative - correct if possible), loculated effusion without imaging guidance',
        equipment: ['Chest drain (size: 28-32F trauma, 12-24F pneumothorax, 20-28F effusion)', 'Seldinger kit or surgical dissection technique', 'Local anaesthetic (10-20ml 1% lidocaine)', 'Underwater seal drainage bottle', 'Suture (silk 1-0)', 'Sterile drapes and instruments'],
        procedure: [
            'Position: Semi-recumbent 45°, arm abducted above head',
            'Site selection: "Safe triangle" - 5th intercostal space, mid-axillary line (anterior border latissimus dorsi, lateral border pectoralis major, apex below axilla, base 5th intercostal space)',
            'Confirm side and level with imaging (CXR/ultrasound)',
            'Aseptic technique throughout',
            'Infiltrate local anaesthetic into skin, subcutaneous tissue, pleura (aspirate to confirm pleural space)',
            'Make 2cm transverse incision along rib',
            'Blunt dissection with Spencer-Wells forceps through muscle layers',
            'Pierce parietal pleura just ABOVE rib (avoid neurovascular bundle below)',
            'Insert gloved finger to confirm pleural space and sweep for adhesions',
            'Advance drain using forceps or guidewire (direct drain tip posteriorly for fluid, apically for air)',
            'Connect to underwater seal, ensure swinging/bubbling',
            'Secure with mattress suture (purse-string), cover with occlusive dressing',
            'Post-procedure CXR to confirm position'
        ],
        complications: {
            'During insertion': 'Bleeding (intercostal artery injury), visceral injury (lung, liver, spleen), re-expansion pulmonary oedema',
            'Early': 'Drain blockage, dislodgement, subcutaneous emphysema, infection',
            'Late': 'Empyema, bronchopleural fistula, chronic pain'
        },
        monitoring: 'Observe for swinging (confirms intrapleural position) and bubbling (air leak). Drain output volume and character. Daily CXR until stable. Check for subcutaneous emphysema',
        removal: 'Remove when: No air leak × 24h, lung re-expanded on CXR, output <200ml/day. Remove during expiration or Valsalva, tie purse-string suture immediately',
        clinicalPearls: 'Never force drain - if resistance, reposition. Triangle of safety ESSENTIAL. Large-bore drains (28-32F) for trauma/haemothorax. Small-bore (12-14F) adequate for simple pneumothorax. Ultrasound guidance for effusions reduces complications',
        supervision: 'Direct supervision essential - high-risk procedure'
    },

    'pneumothorax-aspiration': {
        name: 'Pneumothorax Aspiration',
        category: 'respiratory',
        indication: 'Primary spontaneous pneumothorax <2cm with symptoms OR >2cm on CXR',
        contraindications: 'Tension pneumothorax (needs immediate needle decompression then drain), secondary pneumothorax in COPD (higher failure rate), haemopneumothorax',
        equipment: ['16-18G cannula (or dedicated aspiration kit)', '50ml syringe', 'Three-way tap', 'Local anaesthetic', 'Sterile gloves and drapes'],
        procedure: [
            'Confirm diagnosis: CXR showing pneumothorax',
            'Position: Semi-recumbent or sitting',
            'Site: 2nd intercostal space, mid-clavicular line',
            'Aseptic technique',
            'Infiltrate local anaesthetic',
            'Insert cannula perpendicular to chest wall, just above 3rd rib',
            'Advance until air aspirated (pleural space entered)',
            'Remove needle, leave plastic cannula in situ',
            'Attach syringe via three-way tap',
            'Aspirate air (max 2.5L - stop if resistance or patient coughs)',
            'Remove cannula and apply dressing',
            'Repeat CXR after 4 hours'
        ],
        successCriteria: 'Pneumothorax <2cm on repeat CXR and patient asymptomatic. Success rate 60-80% for primary pneumothorax',
        ifUnsuccessful: 'Insert chest drain if aspiration fails (pneumothorax still >2cm or symptomatic)',
        monitoring: 'Observe 4-6 hours post-aspiration. Repeat CXR. Discharge if successful with <2cm residual. Advise avoid flying for 2 weeks, diving permanently',
        clinicalPearls: 'First-line for primary spontaneous pneumothorax. Aspiration before drain saves admission. Do NOT aspirate >2.5L (suggests ongoing air leak - needs drain). Lower success in secondary (COPD) pneumothorax',
        supervision: 'Direct supervision for initial attempts'
    },

    'lung-function': {
        name: 'Lung Function Tests (Spirometry)',
        category: 'respiratory',
        indication: 'Dyspnoea investigation, COPD/asthma diagnosis, monitoring disease progression, pre-operative assessment',
        contraindications: 'Recent MI (<1 month), aortic aneurysm, recent eye surgery, haemoptysis, pneumothorax',
        measurements: {
            'FEV1': 'Forced expiratory volume in 1 second',
            'FVC': 'Forced vital capacity (total volume exhaled)',
            'FEV1/FVC ratio': 'Normal >70%. <70% = obstructive',
            'PEFR': 'Peak expiratory flow rate'
        },
        procedure: [
            'Calibrate spirometer',
            'Patient seated, nose clip applied',
            'Instruct: "Take deepest breath possible, seal lips around mouthpiece, blast out as hard and fast as possible, keep going until lungs empty"',
            'Coach throughout manoeuvre',
            'Minimum 3 acceptable efforts (reproducible within 150ml)',
            'Report best FEV1 and FVC',
            'Bronchodilator reversibility if obstructive pattern: Repeat after 15min post salbutamol 400mcg'
        ],
        interpretation: {
            'Obstructive': 'FEV1/FVC <70%. Causes: COPD, asthma, bronchiectasis',
            'Restrictive': 'FEV1/FVC >70% but FVC reduced. Causes: ILD, neuromuscular, obesity, pleural disease',
            'Reversibility': 'Improvement in FEV1 ≥12% and ≥200ml post-bronchodilator suggests asthma'
        },
        clinicalPearls: 'Quality control essential - poor technique gives misleading results. >70% predicted = normal. Reversibility testing distinguishes asthma from COPD. Refer for full PFTs if restrictive pattern (need lung volumes)',
        supervision: 'Can be performed independently after training'
    },

    'bronchoscopy': {
        name: 'Bronchoscopy',
        category: 'respiratory',
        indication: 'Haemoptysis, suspected lung cancer, persistent cough, lung infiltrates, bronchial obstruction, BAL for infection/ILD',
        contraindications: 'Severe hypoxia (SpO2 <90% despite O2), unstable angina, recent MI, severe coagulopathy, high-grade tracheal obstruction',
        preparation: ['NBM 4-6 hours', 'Consent (explain risks: bleeding, pneumothorax, hypoxia)', 'IV access', 'Pre-medication: midazolam + fentanyl (sedation)', 'Topical lidocaine to anaesthetise airway'],
        procedure: [
            'Position: Supine or semi-recumbent',
            'Supplemental oxygen throughout',
            'Monitoring: SpO2, BP, ECG',
            'Insert bronchoscope via nose or mouth (oral route for larger scope)',
            'Systematic inspection: Vocal cords → trachea → carina → main bronchi → lobar/segmental bronchi',
            'Therapeutic manoeuvres: Biopsy, BAL, brushings, TBNA, stent insertion, foreign body removal',
            'Withdraw scope, monitor 2-4 hours post-procedure'
        ],
        complications: 'Bleeding (minor common, major <1%), pneumothorax (<1%), hypoxia, laryngospasm, arrhythmia, pneumonia',
        postProcedure: 'NBM for 2 hours (until gag reflex returns). Monitor SpO2. CXR if biopsy performed (exclude pneumothorax). Histology results usually 48-72h',
        clinicalPearls: 'Most common indication: suspected lung cancer. BAL useful for PCP pneumonia (HIV). EBUS (endobronchial ultrasound) allows mediastinal LN sampling. Day case procedure in most patients',
        supervision: 'Performed by respiratory consultant or registrar'
    },

    // ============================================
    // CARDIOVASCULAR PROCEDURES
    // ============================================
    'echocardiography': {
        name: 'Echocardiography (Transthoracic)',
        category: 'cardiovascular',
        indication: 'Heart failure, murmur assessment, valve disease, cardiomyopathy, pericardial effusion, cardiac source of embolism',
        contraindications: 'None (non-invasive)',
        views: ['Parasternal long axis', 'Parasternal short axis', 'Apical 4-chamber', 'Apical 2-chamber', 'Subcostal', 'Suprasternal'],
        assessments: {
            'LV function': 'Ejection fraction (normal >55%). Visual assessment: normal, mild/moderate/severe impairment',
            'Regional wall motion': 'Identifies areas of ischaemia/infarction',
            'Valves': 'Structure, stenosis (gradients, valve area), regurgitation (Doppler)',
            'Pericardium': 'Effusion, tamponade physiology',
            'Right heart': 'RV size/function, pulmonary pressures'
        },
        limitations: 'Poor acoustic window in COPD, obesity. Cannot assess coronary arteries directly',
        clinicalPearls: 'First-line cardiac imaging (safe, quick, no radiation). Bubble study can detect shunts. TOE (transoesophageal) for better valve detail, LA appendage thrombus, endocarditis vegetations',
        supervision: 'Performed by trained sonographer or cardiologist'
    },

    'aaa-repair': {
        name: 'AAA Repair (Open vs EVAR)',
        category: 'cardiovascular',
        indication: 'AAA >5.5cm (men) or >5cm (women), rapidly expanding (>1cm/year), symptomatic AAA',
        techniques: {
            'Open repair': 'Laparotomy, clamp aorta, replace aneurysm with synthetic graft',
            'EVAR': 'Endovascular - stent-graft inserted via femoral arteries under X-ray guidance'
        },
        comparison: {
            'Open': 'Mortality 3-5%, longer recovery (6-12 weeks), durable repair',
            'EVAR': 'Mortality 1-2%, faster recovery (2-6 weeks), requires lifelong surveillance (CT), endoleak risk'
        },
        complications: {
            'Perioperative': 'MI, stroke, bleeding, renal failure, bowel ischaemia, spinal cord ischaemia (paraplegia <1%)',
            'Late (EVAR)': 'Endoleak (blood flow into aneurysm sac), graft migration, rupture'
        },
        surveillance: 'EVAR requires CT at 1 month, 12 months, then annually lifelong',
        clinicalPearls: 'EVAR preferred if suitable anatomy and fit for procedure. Ruptured AAA = surgical emergency (mortality 80%). Screening program in UK for men aged 65',
        supervision: 'Performed by vascular surgeon'
    },

    'pci': {
        name: 'Percutaneous Coronary Intervention (PCI) / Angioplasty',
        category: 'cardiovascular',
        indication: 'STEMI (primary PCI <120min), NSTEMI (high risk), stable angina refractory to medical therapy',
        contraindications: 'Active bleeding, severe contrast allergy, severe renal failure (relative)',
        procedure: [
            'Arterial access: Radial (preferred) or femoral approach',
            'Coronary angiography first (identify culprit lesion)',
            'Guide catheter to coronary ostium',
            'Guidewire across stenosis',
            'Balloon angioplasty to pre-dilate',
            'Deploy drug-eluting stent',
            'Post-dilatation to ensure apposition',
            'Final angiography to confirm TIMI 3 flow'
        ],
        complications: 'Bleeding, haematoma, MI, stroke, coronary dissection, stent thrombosis, contrast nephropathy, vascular complications',
        postProcedure: 'Dual antiplatelet therapy (aspirin + P2Y12 inhibitor) for 12 months minimum. Avoid stopping - stent thrombosis risk. Radial access allows day-case PCI',
        clinicalPearls: 'Door-to-balloon time <90min target for STEMI. Radial access reduces bleeding vs femoral. Drug-eluting stents preferred (lower restenosis). DAPT essential - stopping early increases stent thrombosis risk',
        supervision: 'Performed by interventional cardiologist'
    },

    'cabg': {
        name: 'Coronary Artery Bypass Grafting (CABG)',
        category: 'cardiovascular',
        indication: 'Left main stem disease, 3-vessel disease (especially with diabetes), failed PCI',
        procedure: 'Median sternotomy, cardiopulmonary bypass, grafts (LIMA to LAD, SVG to other vessels), off-pump CABG alternative',
        complications: 'Stroke (2%), sternal wound infection, AF (30%), renal failure, bleeding',
        recovery: '5-7 days hospital, 6-12 weeks full recovery. Cardiac rehab essential',
        clinicalPearls: 'CABG superior to PCI for left main/3-vessel disease. LIMA graft to LAD has 95% 10-year patency. Saphenous vein grafts occlude over time (50% at 10 years)',
        supervision: 'Performed by cardiothoracic surgeon'
    },

    'carotid-endarterectomy': {
        name: 'Carotid Endarterectomy',
        category: 'cardiovascular',
        indication: 'Symptomatic carotid stenosis >50%, asymptomatic >70%, recent TIA/stroke with ipsilateral stenosis',
        procedure: 'Incision along SCM, expose carotid bifurcation, clamp arteries, arteriotomy, remove atherosclerotic plaque, patch angioplasty, restore flow',
        complications: 'Stroke (2-3%), MI, cranial nerve injury (hypoglossal, vagus), bleeding, restenosis',
        timing: 'Perform within 2 weeks of TIA/minor stroke (urgent within 48h for crescendo TIA)',
        alternative: 'Carotid artery stenting (CAS) - for high-risk surgical patients',
        clinicalPearls: 'Reduces stroke risk by 50% in symptomatic stenosis. Perioperative stroke risk 2-3% but outweighed by long-term benefit. Aspirin + statin lifelong post-op',
        supervision: 'Performed by vascular surgeon'
    },

    // ============================================
    // GASTROINTESTINAL PROCEDURES
    // ============================================
    'egd': {
        name: 'Oesophagogastroduodenoscopy (OGD)',
        category: 'gastrointestinal',
        indication: 'Dyspepsia with alarm features, GI bleeding, dysphagia, surveillance (Barrett, PUD), biopsy for H. pylori/coeliac',
        contraindications: 'Suspected perforation, severe coagulopathy, recent MI, patient refusal',
        preparation: 'NBM 6 hours. Consent. Sedation (midazolam ± fentanyl) or unsedated. Throat spray (lidocaine)',
        procedure: [
            'Left lateral position',
            'Mouthguard inserted',
            'Scope advanced through oropharynx → oesophagus → stomach → duodenum (D2)',
            'Systematic inspection on insertion and withdrawal',
            'Biopsies as indicated',
            'Therapeutic: Haemostasis (clips, cautery), variceal banding, dilatation, PEG insertion'
        ],
        complications: 'Perforation (<0.1%), bleeding (<1% diagnostic, 2-5% therapeutic), aspiration, cardiorespiratory events from sedation',
        postProcedure: 'Recover 1-2 hours. NBM 1 hour. Avoid driving 24h if sedated. Report fever, pain, bleeding immediately',
        findings: {
            'Common': 'Gastritis, duodenitis, peptic ulcer, hiatus hernia, Barrett oesophagus, oesophagitis',
            'Serious': 'Malignancy, varices, strictures'
        },
        clinicalPearls: '2-week-wait OGD for >55 years with dyspepsia. Stop PPI 2 weeks before if testing for H. pylori. Gastric ulcer biopsy mandatory (exclude malignancy)',
        supervision: 'Performed by gastroenterologist or surgeon'
    },

    'colonoscopy': {
        name: 'Colonoscopy',
        category: 'gastrointestinal',
        indication: 'Lower GI bleeding, change in bowel habit, IBD surveillance, polyp follow-up, colorectal cancer screening',
        contraindications: 'Suspected perforation, acute diverticulitis, fulminant colitis, recent MI',
        preparation: 'Low-residue diet 48h prior. Bowel prep (e.g., Moviprep) day before. NBM from midnight. Consent',
        procedure: [
            'Left lateral position',
            'Sedation (midazolam ± fentanyl) or gas/air or unsedated',
            'Digital rectal examination',
            'Insert colonoscope per rectum',
            'Advance to caecum (ileocaecal valve, appendix orifice, tri-radiate folds)',
            'Inspect mucosa carefully on withdrawal (polyps often missed on insertion)',
            'Polypectomy if polyps identified',
            'Biopsy if inflammation'
        ],
        complications: 'Perforation (1:1000 diagnostic, 1:500 with polypectomy), bleeding (1:100 polypectomy), post-polypectomy syndrome',
        postProcedure: 'Recover 1-2 hours. Report pain, bleeding, fever immediately (perforation)',
        quality: 'Caecal intubation rate >90%. Adenoma detection rate >25% (men), >15% (women). Withdrawal time >6 minutes',
        clinicalPearls: 'Bowel prep quality crucial (poor prep misses 25% adenomas). CT colonography alternative if incomplete. Polyps >1cm or pedunculated require snare polypectomy',
        supervision: 'Performed by gastroenterologist or surgeon'
    },

    'paracentesis': {
        name: 'Abdominal Paracentesis (Ascitic Tap)',
        category: 'gastrointestinal',
        indication: 'New ascites (diagnostic tap), tense ascites (therapeutic drainage), ?SBP',
        contraindications: 'Severe coagulopathy (INR >2), thrombocytopenia (<50), pregnancy, bowel obstruction, cellulitis at site',
        equipment: ['18G needle or drainage catheter', '20-50ml syringe (diagnostic)', 'Ascitic drainage bottle', 'Sterile gloves', 'Chlorhexidine', 'Local anaesthetic', 'Ultrasound'],
        procedure: [
            'Ultrasound to identify safe pocket (avoid bowel, vessels, organs)',
            'Position: Semi-recumbent or sitting',
            'Site: Left lower quadrant (avoid midline - inferior epigastric vessels, avoid RLQ - caecum)',
            'Mark spot with deepest pocket >2cm from skin',
            'Aseptic technique',
            'Infiltrate local anaesthetic down to peritoneum',
            'Z-track technique (pull skin taut laterally before needle insertion)',
            'Advance needle perpendicular until fluid obtained',
            'Aspirate 20-50ml for diagnostic sample',
            'For therapeutic: Attach drainage catheter, drain max 5-6L (albumin replacement if >5L)',
            'Remove needle, apply pressure, dressing'
        ],
        samples: 'Send for: Cell count + differential, Gram stain + culture (blood culture bottles), albumin, protein, glucose, amylase, cytology',
        interpretation: {
            'SAAG >11 g/L': 'Portal hypertension (cirrhosis, cardiac, Budd-Chiari)',
            'SAAG <11 g/L': 'Non-portal hypertension (malignancy, TB, pancreatitis, nephrotic)',
            'SBP': 'Neutrophils >250 cells/mm³ - start antibiotics immediately (cefotaxime)'
        },
        complications: 'Bleeding, bowel perforation, infection, hypotension (large-volume), persistent leak',
        clinicalPearls: 'Ultrasound guidance mandatory (reduces complications). Always measure SAAG (serum albumin - ascites albumin). SBP diagnosis based on neutrophils >250 even if culture negative. Give 20% albumin 8g/L drained if >5L removed',
        supervision: 'Direct supervision for initial attempts, indirect once competent'
    },

    'appendicectomy': {
        name: 'Appendicectomy',
        category: 'gastrointestinal',
        indication: 'Acute appendicitis',
        approach: {
            'Laparoscopic': 'Preferred - faster recovery, less pain, lower wound infection. 3 ports (umbilical, suprapubic, LIF)',
            'Open': 'Grid-iron or Lanz incision over McBurney point if laparoscopy not feasible'
        },
        procedure: 'Identify appendix, ligate mesoappendix, divide base, remove, wash peritoneum',
        complications: 'Wound infection, intra-abdominal abscess, ileus, adhesions',
        postOperative: 'Laparoscopic: Day case or overnight. Open: 2-3 days. Antibiotics if perforation',
        clinicalPearls: 'Laparoscopic preferred in women (can inspect ovaries). If normal appendix found, inspect for Meckel, Crohn, ovarian pathology. Perforated appendix needs prolonged antibiotics',
        supervision: 'Core surgical training procedure'
    },

    'laparoscopy': {
        name: 'Diagnostic/Therapeutic Laparoscopy',
        category: 'gastrointestinal',
        indication: 'Acute abdomen, appendicitis, gynaecological (ectopic, ovarian cyst), cholecystectomy',
        contraindications: 'Severe cardiorespiratory disease, suspected bowel obstruction, previous multiple laparotomies',
        procedure: [
            'General anaesthesia with muscle relaxation',
            'Veress needle or Hasson (open) technique to create pneumoperitoneum (CO2)',
            'Umbilical port inserted (camera)',
            'Additional ports as needed',
            'Systematic inspection of abdominal organs',
            'Therapeutic intervention (e.g., appendicectomy, cholecystectomy)',
            'Desufflate, close port sites'
        ],
        complications: 'Bleeding, bowel/vessel injury (rare), port-site hernia, shoulder tip pain (referred from diaphragm)',
        advantages: 'Faster recovery, less pain, shorter hospital stay, better cosmesis',
        clinicalPearls: 'Gold standard for acute abdomen in stable patients. Convert to open if unsafe to proceed laparoscopically',
        supervision: 'Surgical registrar/consultant'
    },

    'cholecystectomy': {
        name: 'Laparoscopic Cholecystectomy',
        category: 'gastrointestinal',
        indication: 'Symptomatic gallstones (biliary colic, acute cholecystitis), gallstone pancreatitis (interval cholecystectomy)',
        timing: 'Acute cholecystitis: Within 72h if possible. Pancreatitis: 2-4 weeks after resolution',
        procedure: '4-port laparoscopy. Identify Calot triangle (cystic duct, cystic artery, liver edge). Intraoperative cholangiogram if bile duct stones suspected. Clip and divide cystic duct and artery. Dissect gallbladder from liver bed',
        complications: 'Bile duct injury (<0.5% but serious), bleeding, bile leak, post-cholecystectomy syndrome (diarrhoea)',
        postOperative: 'Day case or overnight. Return to work 1-2 weeks',
        clinicalPearls: 'Critical view of safety essential (identify 2 structures only entering GB). ERCP pre-op if CBD stones on imaging. Bile duct injury recognised intra-op has better outcome than delayed recognition',
        supervision: 'Core surgical training procedure with supervision'
    },

    'hernia-repair': {
        name: 'Inguinal Hernia Repair',
        category: 'gastrointestinal',
        indication: 'Symptomatic inguinal hernia',
        types: {
            'Direct': 'Through Hesselbach triangle (medial to inferior epigastric vessels)',
            'Indirect': 'Through internal inguinal ring (lateral to vessels) - into scrotum'
        },
        techniques: {
            'Open mesh (Lichtenstein)': 'Most common. Inguinal incision, reduce hernia, mesh over defect, fix with sutures',
            'Laparoscopic (TEP/TAPP)': 'Mesh placed from inside. Faster recovery, bilateral repair easier, but more expensive'
        },
        complications: 'Chronic pain (10%), recurrence (1-2% with mesh), wound infection, seroma, testicular ischaemia/atrophy (rare)',
        postOperative: 'Day case. Return to work 2-4 weeks. Avoid heavy lifting 6 weeks',
        clinicalPearls: 'Mesh reduces recurrence vs non-mesh. Examine both sides (often bilateral). Laparoscopic preferred for recurrent/bilateral hernias',
        supervision: 'Core surgical training procedure'
    },

    // ============================================
    // UROLOGICAL PROCEDURES
    // ============================================
    'catheterisation-male': {
        name: 'Male Urinary Catheterisation',
        category: 'urology',
        indication: 'Urinary retention, post-operative, monitoring urine output, bladder irrigation',
        contraindications: 'Urethral injury (blood at meatus, perineal haematoma), acute prostatitis',
        equipment: ['Catheter (12-16F Foley most common)', 'Catheter pack (sterile)', 'Lignocaine gel', 'Saline for balloon', 'Drainage bag'],
        procedure: [
            'Explain procedure, obtain consent',
            'Supine position',
            'Clean penis with antiseptic wipes (foreskin retracted)',
            'Drape with sterile fenestrated drape',
            'Instil 10-15ml lignocaine gel into urethra, wait 3-5 min',
            'Hold penis perpendicular to body (straightens urethra)',
            'Gently advance catheter to hilt (do NOT inflate balloon until urine draining)',
            'Inflate balloon with saline (10ml standard)',
            'Withdraw catheter until resistance felt',
            'Replace foreskin (prevent paraphimosis)',
            'Connect drainage bag, document'
        ],
        complications: 'Urethral trauma, false passage, paraphimosis, infection, bleeding, bladder perforation (rare)',
        troubleshooting: {
            'Resistance at sphincter': 'Wait, gentle sustained pressure, smaller catheter, consider suprapubic catheter',
            'No urine draining': 'Ensure catheter fully inserted (to hilt) before inflating balloon'
        },
        clinicalPearls: 'Never force catheter. If difficult, try smaller size or different type (Tiemann/coudé tip for enlarged prostate). Replace foreskin to prevent paraphimosis. Document indication, size, balloon volume',
        supervision: 'Direct supervision initially, can perform independently after training'
    },

    'catheterisation-female': {
        name: 'Female Urinary Catheterisation',
        category: 'urology',
        indication: 'As per male catheterisation',
        contraindications: 'Urethral injury (rare in females)',
        procedure: [
            'Explain procedure, chaperone present',
            'Supine with knees bent, legs apart (frog-leg position)',
            'Clean vulva with antiseptic wipes',
            'Identify urethral meatus (between clitoris and vagina)',
            'Part labia with non-dominant hand',
            'Instil lignocaine gel (optional - urethra shorter)',
            'Gently advance catheter 5-7cm until urine flows',
            'Inflate balloon',
            'Connect drainage bag'
        ],
        complications: 'As per male, plus vaginal insertion (if in vagina, leave in situ as landmark, try again anteriorly)',
        clinicalPearls: 'Shorter urethra makes easier than male. Common error: Inserting into vagina - if happens, leave catheter there as landmark and try again more anteriorly',
        supervision: 'Direct supervision initially'
    },

    'turp': {
        name: 'Transurethral Resection of Prostate (TURP)',
        category: 'urology',
        indication: 'BPH refractory to medical treatment, urinary retention not resolving',
        procedure: 'Resectoscope inserted per urethra. Prostate tissue resected using diathermy loop. Irrigation to remove chips. Catheter inserted',
        complications: 'Bleeding, TURP syndrome (hyponatraemia from irrigation fluid absorption), retrograde ejaculation (common), incontinence, erectile dysfunction',
        postOperative: 'Catheter 24-48h with irrigation. Discharge day 2-3. Avoid driving/heavy lifting 2 weeks',
        alternatives: 'HoLEP (laser), UroLift, prostatic artery embolisation',
        clinicalPearls: 'Gold standard surgical treatment for BPH. Warn about retrograde ejaculation (80%). TURP syndrome rare now (isotonic irrigation used)',
        supervision: 'Urological consultant/senior registrar'
    },

    'turbt': {
        name: 'TURBT (Transurethral Resection of Bladder Tumour)',
        category: 'urology',
        indication: 'Bladder tumour - diagnosis and treatment of non-muscle-invasive bladder cancer',
        procedure: 'Cystoscopy, identify tumour, resect with diathermy loop (include muscle layer in specimen for staging), evacuate chips, catheter',
        complications: 'Bleeding, perforation, infection, recurrence',
        postOperative: 'Catheter 24-48h. Single dose intravesical chemotherapy (mitomycin) within 24h if no perforation',
        followUp: 'Histology determines stage (Ta, T1, CIS). High-grade tumours need repeat TURBT + BCG immunotherapy. Surveillance cystoscopy 3-monthly year 1',
        clinicalPearls: 'Include muscle in resection (essential for staging). High recurrence rate - surveillance crucial. Single-dose chemo reduces recurrence by 30%',
        supervision: 'Urological consultant/senior registrar'
    },

    'cystoscopy': {
        name: 'Cystoscopy (Flexible)',
        category: 'urology',
        indication: 'Haematuria, bladder tumour surveillance, recurrent UTI, urethral stricture',
        contraindications: 'Acute UTI, urethral trauma',
        procedure: [
            'Local anaesthetic gel per urethra',
            'Flexible cystoscope inserted',
            'Systematic inspection: Urethra → prostate/bladder neck → bladder (trigone, lateral walls, dome, ureteric orifices)',
            'Biopsy if abnormality seen'
        ],
        advantages: 'Office procedure, well tolerated, no anaesthetic needed',
        findings: 'Tumour, stones, inflammation, prostate enlargement, stricture',
        clinicalPearls: 'Flexible scope better tolerated than rigid. Haematuria >50 years needs cystoscopy + CT urogram. Rigid cystoscopy used for biopsies/therapeutic interventions',
        supervision: 'Can be performed by trained nurse specialist'
    },

    // ============================================
    // OBSTETRIC & GYNAECOLOGICAL PROCEDURES
    // ============================================
    'forceps-delivery': {
        name: 'Operative Vaginal Delivery (Forceps)',
        category: 'obstetrics',
        indication: 'Failure to progress in 2nd stage, fetal distress, maternal exhaustion, maternal indication to shorten 2nd stage (cardiac disease)',
        prerequisites: 'Full dilatation, head ≤1/5 palpable abdominally, vertex presentation, position known, adequate analgesia, consent, empty bladder',
        procedure: [
            'Assess pelvis and position (OA, LOA, ROA)',
            'Choose appropriate forceps (Wrigley for outlet, Neville-Barnes for mid-cavity)',
            'Insert left blade then right blade around fetal head',
            'Check application (sagittal suture midline, posterior fontanelle 1cm above shanks)',
            'Traction with contractions, perpendicular to handles',
            'Episiotomy if required',
            'Deliver head between contractions, check for cord',
            'Deliver body as normal vaginal delivery'
        ],
        complications: 'Maternal: Perineal trauma, PPH, bladder injury. Fetal: Facial bruising/laceration, cephalhaematoma, skull fracture (rare)',
        failedInstrumental: 'Abandon after 3 contractions with no descent - proceed to C-section',
        clinicalPearls: 'Traction in line with pelvic curve. Never use rotational forceps without training. Ventouse alternative (lower maternal trauma but higher failure rate)',
        supervision: 'Senior obstetrician must be present'
    },

    'caesarean-section': {
        name: 'Lower Segment Caesarean Section (LSCS)',
        category: 'obstetrics',
        indication: 'Emergency: Fetal distress, cord prolapse, placental abruption, failed instrumental delivery. Elective: Previous 2 C-sections, breech, placenta praevia',
        classification: {
            'Category 1': 'Immediate threat to life (maternal/fetal) - deliver within 30 min',
            'Category 2': 'Maternal/fetal compromise, not immediately life-threatening - within 75 min',
            'Category 3': 'No maternal/fetal compromise, needs early delivery',
            'Category 4': 'Elective'
        },
        procedure: [
            'Pfannenstiel incision (transverse suprapubic)',
            'Dissect to peritoneum',
            'Lower segment hysterotomy (transverse)',
            'Deliver baby, cord clamping',
            'Deliver placenta',
            'Close uterus (2 layers)',
            'Close abdomen'
        ],
        complications: 'Bleeding (PPH), infection, VTE, bladder/bowel injury, adhesions (future surgery complicated), scar rupture in subsequent pregnancies',
        postOperative: 'Mobilise early (VTE prophylaxis), analgesia, LMWH, remove catheter 12-24h, discharge day 2-3',
        VBAC: 'Vaginal birth after C-section possible (70% success) if one previous LSCS',
        clinicalPearls: 'Antibiotics at knife-to-skin (reduces infection). Oxytocin after delivery (PPH prevention). Category 1 = 30-min target',
        supervision: 'Obstetric consultant for category 1, registrar for others with consultant available'
    },

    'hysteroscopy': {
        name: 'Hysteroscopy',
        category: 'gynaecology',
        indication: 'Abnormal uterine bleeding, fibroids, endometrial polyps, retained IUCD, Asherman syndrome',
        procedure: 'Hysteroscope inserted via cervix into uterine cavity. Distension medium (saline). Systematic inspection. Biopsy, polypectomy, fibroid resection if indicated',
        complications: 'Perforation, bleeding, infection, fluid overload (if glycine used)',
        advantages: 'Direct visualisation, biopsy under vision, outpatient procedure',
        clinicalPearls: 'Outpatient hysteroscopy gold standard for HMB investigation. Local anaesthetic/no anaesthetic often sufficient. Therapeutic hysteroscopy (myomectomy) needs GA',
        supervision: 'Gynaecologist'
    },

    'laparoscopy-gynae': {
        name: 'Diagnostic/Therapeutic Laparoscopy (Gynaecology)',
        category: 'gynaecology',
        indication: 'Ectopic pregnancy, ovarian cyst, endometriosis, chronic pelvic pain, sterilisation',
        procedure: 'As per general laparoscopy. Inspection of pelvis, ovaries, tubes, uterus. Dye test for tubal patency. Therapeutic: Salpingectomy (ectopic), cystectomy, endometriosis treatment',
        complications: 'As per general laparoscopy',
        clinicalPearls: 'Gold standard for ectopic pregnancy management if stable. Endometriosis diagnosed visually + histology',
        supervision: 'Gynaecologist'
    },

    // ============================================
    // ORTHOPAEDIC PROCEDURES
    // ============================================
    'joint-aspiration': {
        name: 'Joint Aspiration and Injection',
        category: 'orthopaedics',
        indication: 'Diagnostic: Septic arthritis, crystal arthropathy, haemarthrosis. Therapeutic: Steroid injection, drainage',
        contraindications: 'Cellulitis overlying joint, prosthetic joint (relative), coagulopathy',
        equipment: ['Sterile gloves', 'Chlorhexidine', 'Local anaesthetic', '21G needle (small joints), 18G (large joints)', 'Syringe', 'Specimen pots'],
        commonSites: {
            'Knee': 'Lateral or medial approach, superior to patella. Extend knee fully',
            'Shoulder': 'Posterior approach or anterior',
            'Ankle': 'Anterior approach, medial to tibialis anterior tendon',
            'Elbow': 'Lateral approach, between olecranon and lateral epicondyle'
        },
        procedure: [
            'Identify landmarks, mark site',
            'Aseptic technique (no-touch technique)',
            'Infiltrate local anaesthetic (skin to joint capsule)',
            'Insert needle perpendicular, advance until joint space entered',
            'Aspirate fluid - send for: Cell count + differential, Gram stain + culture, crystals (polarised microscopy)',
            'For injection: Withdraw needle slightly, inject steroid (e.g., triamcinolone 40mg knee)',
            'Warn patient: May have pain flare first 24-48h, improved symptoms by 1 week'
        ],
        interpretation: {
            'Normal synovial fluid': 'Clear, <200 WBC/μL',
            'Non-inflammatory': '200-2000 WBC (OA, trauma)',
            'Inflammatory': '2000-50,000 WBC (RA, crystal, seronegative)',
            'Septic': '>50,000 WBC (>75% neutrophils), Gram stain +ve 60-80%'
        },
        complications: 'Infection (rare <1:10,000), bleeding, damage to cartilage/nerves',
        clinicalPearls: 'Always aspirate before injecting. Septic arthritis diagnosis needs >50,000 WBC with neutrophil predominance + culture. Negative culture doesn\'t exclude sepsis. Crystals: Urate (gout) = negatively birefringent needles, CPPD (pseudogout) = positively birefringent rhomboids',
        supervision: 'Direct supervision for initial attempts'
    },

    'hip-replacement': {
        name: 'Total Hip Replacement',
        category: 'orthopaedics',
        indication: 'Severe OA, fracture neck of femur (displaced intracapsular), AVN, RA',
        procedure: 'Remove femoral head and acetabular cartilage, insert prosthesis (cemented or uncemented)',
        approaches: 'Posterior (most common), anterolateral, direct anterior',
        complications: 'Dislocation (1-3%, higher with posterior approach), infection, loosening, leg length discrepancy, VTE, nerve injury',
        postOperative: 'Mobilise day 1 with physio, VTE prophylaxis, discharge 2-5 days, avoid flexion >90°, adduction, internal rotation for 6 weeks',
        clinicalPearls: 'Anterior approach lower dislocation risk. Cemented in elderly, uncemented in young. Prosthesis lifespan 15-20 years',
        supervision: 'Orthopaedic consultant/senior registrar'
    },

    'dhs': {
        name: 'Dynamic Hip Screw (DHS)',
        category: 'orthopaedics',
        indication: 'Stable intertrochanteric hip fractures',
        procedure: 'Closed reduction on traction table, guidewire insertion under image intensifier, reaming, lag screw insertion, side plate fixation',
        complications: 'Infection, nonunion, screw cutout, metalwork failure',
        postOperative: 'Weight-bearing as tolerated, VTE prophylaxis',
        alternative: 'Intramedullary nail for reverse oblique/subtrochanteric fractures',
        clinicalPearls: 'Gold standard for intertrochanteric fractures. Early surgery (<48h) improves outcomes. Tip-apex distance <25mm reduces cutout risk',
        supervision: 'Orthopaedic team'
    },

    'fracture-fixation': {
        name: 'Open Reduction Internal Fixation (ORIF)',
        category: 'orthopaedics',
        indication: 'Displaced/unstable fractures requiring anatomical reduction (intra-articular, long bones)',
        techniques: {
            'Plates and screws': 'Radius/ulna, tibia, clavicle',
            'Intramedullary nail': 'Femur, tibia - load sharing, preserves blood supply',
            'K-wires': 'Small bones (hand, wrist)'
        },
        complications: 'Infection, malunion, nonunion, metalwork failure, compartment syndrome',
        postOperative: 'Depends on fracture. Weight-bearing restrictions, physio, metalwork removal sometimes needed',
        clinicalPearls: 'ORIF for displaced fractures needing anatomical reduction. External fixation for contaminated open fractures. IM nailing preferred for femoral shaft fractures',
        supervision: 'Orthopaedic consultant/registrar'
    },

    // ============================================
    // PRACTICAL PROCEDURES (Foundation Level)
    // ============================================
    'venepuncture': {
        name: 'Venepuncture',
        category: 'practical',
        indication: 'Blood sampling for investigations',
        equipment: ['Tourniquet', 'Vacutainer needle or butterfly', 'Blood bottles (correct order)', 'Alcohol wipe', 'Gauze', 'Tape'],
        procedure: [
            'Identify patient, explain procedure',
            'Position arm extended, supported',
            'Apply tourniquet (not >1 min)',
            'Identify vein (palpate, don\'t just look)',
            'Clean with alcohol, allow to dry',
            'Anchor vein with thumb, insert needle at 15-30°',
            'Flashback of blood confirms venous access',
            'Attach bottles in correct order, allow to fill',
            'Release tourniquet before removing needle',
            'Apply pressure, patient keeps arm straight'
        ],
        bottleOrder: '1. Blood culture, 2. Coagulation (blue), 3. Serum (yellow/red), 4. Heparin (green), 5. EDTA (purple), 6. Fluoride (grey)',
        sites: 'Antecubital fossa (median cubital, cephalic, basilic veins)',
        complications: 'Bruising, haematoma, nerve injury, needlestick injury',
        clinicalPearls: 'Palpate vein (bounce) - don\'t just rely on visual. Apply tourniquet just before puncture (prolonged stasis affects results). Bottle order matters - wrong order causes clotting in wrong bottles',
        supervision: 'Direct supervision initially, can perform independently once competent (F1)'
    },

    'cannulation': {
        name: 'IV Cannulation',
        category: 'practical',
        indication: 'IV fluids, medications, blood transfusion',
        equipment: ['IV cannula (size: 22G pediatrics, 20G routine, 18G blood transfusion, 14-16G trauma)', 'Tourniquet', 'Alcohol wipe', 'Saline flush', 'Dressing', 'Sharps bin'],
        procedure: [
            'Choose site and size (bigger vein = bigger cannula)',
            'Apply tourniquet',
            'Clean skin',
            'Anchor vein',
            'Insert at 15-30°, flashback confirms entry',
            'Advance cannula off needle into vein',
            'Release tourniquet, occlude vein proximally, remove needle',
            'Cap cannula, flush with saline',
            'Secure with dressing',
            'Date cannula'
        ],
        sites: 'Hand/forearm veins preferred. Avoid antecubital fossa (restricts movement), legs (higher phlebitis), feet',
        complications: 'Phlebitis, thrombophlebitis, extravasation, infection, needlestick',
        clinicalPearls: 'Bigger is better for resuscitation/transfusion. Avoid in limbs with AVF, mastectomy side. Resite every 72-96h or if signs of phlebitis. Hot pack/GTN patch helps dilate difficult veins',
        supervision: 'Direct supervision initially (F1)'
    },

    'abg-sampling': {
        name: 'Arterial Blood Gas Sampling',
        category: 'practical',
        indication: 'Respiratory failure, metabolic disturbance, sepsis, diabetic emergencies',
        contraindications: 'Failed Allen test, severe peripheral vascular disease, infection at site',
        equipment: ['ABG syringe (pre-heparinised)', 'Alcohol wipe', 'Gauze', 'Gloves'],
        procedure: [
            'Perform Allen test (confirm ulnar collateral circulation)',
            'Extend wrist over rolled towel',
            'Palpate radial artery (strongest pulsation)',
            'Clean with alcohol',
            'Insert needle at 45-90° against arterial pulsation',
            'Syringe will fill spontaneously (pulsatile bright red blood)',
            'Withdraw needle, apply firm pressure 5 minutes',
            'Expel air bubbles, cap syringe, mix gently',
            'Analyse immediately (or place on ice if delay)'
        ],
        sites: 'Radial artery (first choice), brachial, femoral',
        complications: 'Haematoma (common), arterial spasm, nerve injury, needlestick',
        clinicalPearls: 'Allen test mandatory. Don\'t aspirate syringe (arterial pressure fills it). Firm pressure 5 min post-procedure essential. Air bubbles falsely raise pO2',
        supervision: 'Direct supervision initially'
    },

    'lumbar-puncture': {
        name: 'Lumbar Puncture',
        category: 'practical',
        indication: 'Suspected meningitis, SAH (if CT negative), GBS, MS, IIH',
        contraindications: 'Signs of raised ICP with mass effect (needs CT first), infection at site, coagulopathy (platelets <50, INR >1.4), suspected spinal cord lesion',
        equipment: ['LP kit', 'Manometer', 'Sample bottles (numbered 1-4)', 'Local anaesthetic', 'Sterile gloves and drapes'],
        procedure: [
            'Explain procedure, obtain consent',
            'Position: Left lateral, knees to chest, back perpendicular to bed (or sitting)',
            'Identify L3/4 or L4/5 space (line joining iliac crests = L4)',
            'Aseptic technique',
            'Infiltrate local anaesthetic',
            'Insert spinal needle (midline, slight cranial angulation) between spinous processes',
            'Advance until "pop" (ligamentum flavum), remove stylet',
            'CSF should drip out',
            'Attach manometer, measure opening pressure',
            'Collect 5-10 drops in each bottle (1-4)',
            'Replace stylet, withdraw needle, apply dressing'
        ],
        samples: 'Bottle 1: Microscopy/Gram stain. 2: Protein/glucose. 3: Culture. 4: Cell count (compare with bottle 1 to exclude traumatic tap)',
        complications: 'Post-LP headache (20% - worse on standing, better lying flat. Treat with hydration, caffeine, blood patch if severe), bleeding, infection, nerve root injury',
        troubleshooting: {
            'No CSF': 'Rotate needle 90°, advance/withdraw slightly, try space above/below',
            'Bloody tap': 'Compare bottles 1 and 4 - RBC count similar suggests SAH, decreasing suggests traumatic tap'
        },
        clinicalPearls: 'CT head first if: GCS <13, focal neurology, papilloedema, immunocompromised. Don\'t delay antibiotics for LP in suspected meningitis. Post-LP headache reduced by using smaller needle (22G), replacing stylet before withdrawal',
        supervision: 'Direct supervision essential'
    },

    'ng-tube': {
        name: 'Nasogastric Tube Insertion',
        category: 'practical',
        indication: 'Enteral feeding, gastric decompression, bowel obstruction, drug administration',
        contraindications: 'Base of skull fracture, severe coagulopathy, oesophageal varices (relative)',
        equipment: ['NG tube (10-14F feeding, 16-18F drainage)', 'Lubricant', 'Tape', 'pH paper', 'CXR'],
        procedure: [
            'Explain procedure, sit patient upright',
            'Measure tube: Nose → ear → xiphisternum',
            'Lubricate tip',
            'Insert via nostril, direct posteriorly (not upwards)',
            'When reaches nasopharynx, ask patient to swallow (sips of water help)',
            'Advance to measured length',
            'Check position: Aspirate, test pH (must be ≤5.5), CXR if feeding'
        ],
        complications: 'Malposition (bronchus, oesophagus), aspiration, bleeding, perforation (rare)',
        clinicalPearls: 'Never feed via NG tube until position confirmed (CXR or pH <5.5). If pH >5.5, advance 10cm and retest. Whoosh test unreliable - don\'t use. Fine-bore tubes for feeding, wide-bore for drainage',
        supervision: 'Can be performed independently after training, but needs CXR before feeding'
    },

    'urinary-catheter-foundation': {
        name: 'Urinary Catheterisation (Foundation)',
        category: 'practical',
        indication: 'Urinary retention, monitoring urine output, perioperative, incontinence (last resort)',
        contraindications: 'Urethral injury (blood at meatus), acute prostatitis',
        documentation: 'Always document: Indication, date, time, catheter type, size, balloon volume, residual volume, complications',
        removal: 'Remove ASAP when no longer indicated (reduces CAUTI risk). Trial without catheter (TWOC) after acute retention',
        clinicalPearls: 'Catheter-associated UTI most common hospital-acquired infection. Daily review of need. Long-term catheters need 3-monthly change. Catheter should never be forced',
        supervision: 'Direct supervision initially, indirect supervision when competent'
    }
};
