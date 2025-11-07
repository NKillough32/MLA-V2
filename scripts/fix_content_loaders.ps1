# Fix content loader functions with proper UTF-8 encoding

$filePath = "C:\Users\Nicho\Desktop\MLA-V2\static\js\v2\main.js"
$content = Get-Content $filePath -Raw -Encoding UTF8

# Fix loadExaminationContent
$content = $content -replace `
    "loadExaminationContent\(panel\) \{[^}]*console\.log\([^)]*Examination[^)]*\);[\s\n]*\}", `
    @"
loadExaminationContent(panel) {
        const container = panel.querySelector('#examination-container');
        if (!container) {
            console.log('🩺 Examination guides UI already loaded');
            return;
        }
        
        const examinations = examinationManager.getAllExaminations();
        
        let html = '<h3>Clinical Examination Guides</h3>';
        html += '<div class="examination-list">';
        
        examinations.forEach(exam => {
            html += `
                <div class="examination-card">
                    <h4>`${exam.name}</h4>
                    <p class="exam-system">`${exam.system || 'General'}</p>
                    <div class="exam-steps">
                        `${exam.steps ? exam.steps.map((step, idx) => `
                            <div class="exam-step">
                                <span class="step-number">`${idx + 1}</span>
                                <span class="step-description">`${step}</span>
                            </div>
                        ``).join('') : ''}
                    </div>
                </div>
            ``;
        });
        
        html += '</div>';
        container.innerHTML = html;
        console.log('🩺 Examination guides content loaded');
    }
"@

# Fix loadEmergencyProtocolsContent
$content = $content -replace `
    "loadEmergencyProtocolsContent\(panel\) \{[^}]*console\.log\([^)]*Emergency[^)]*\);[\s\n]*\}", `
    @"
loadEmergencyProtocolsContent(panel) {
        const container = panel.querySelector('#emergency-protocols-container');
        if (!container) {
            console.log('🚨 Emergency protocols UI already loaded');
            return;
        }
        
        const protocols = emergencyProtocolsManager.getAllProtocols();
        
        let html = '';
        protocols.forEach(protocol => {
            html += `
                <div class="protocol-card" data-category="`${protocol.category || 'general'}">
                    <h4>`${protocol.name}</h4>
                    <p class="protocol-category">`${protocol.category || 'Emergency'}</p>
                    <div class="protocol-steps">
                        `${protocol.steps ? protocol.steps.map((step, idx) => `
                            <div class="protocol-step">
                                <span class="step-number">`${idx + 1}</span>
                                <span class="step-description">`${step}</span>
                            </div>
                        ``).join('') : ''}
                    </div>
                    `${protocol.notes ? `<p class="protocol-notes"><strong>Note:</strong> `${protocol.notes}</p>`` : ''}
                </div>
            ``;
        });
        
        container.innerHTML = html;
        console.log('🚨 Emergency protocols content loaded');
    }
"@

# Fix loadInterpretationToolsContent
$content = $content -replace `
    "loadInterpretationToolsContent\(panel\) \{[^}]*console\.log\([^)]*Interpretation[^)]*\);[\s\n]*\}", `
    @"
loadInterpretationToolsContent(panel) {
        const container = panel.querySelector('#interpretation-container');
        if (!container) {
            console.log('📊 Interpretation tools UI already loaded');
            return;
        }
        
        const tools = this.interpretationToolsManager.getAllTools();
        
        let html = '';
        tools.forEach(tool => {
            html += `
                <div class="interpretation-card" data-category="`${tool.category || 'general'}">
                    <h4>`${tool.name}</h4>
                    <p class="tool-category">`${tool.category || 'Interpretation'}</p>
                    <p class="tool-description">`${tool.description || ''}</p>
                    `${tool.criteria ? `
                        <ul class="tool-criteria">
                            `${tool.criteria.map(criterion => `<li>`${criterion}</li>``).join('')}
                        </ul>
                    `` : ''}
                </div>
            ``;
        });
        
        container.innerHTML = html;
        console.log('📊 Interpretation tools content loaded');
    }
"@

# Save with UTF-8 encoding
[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)

Write-Host "✅ Updated content loader functions!" -ForegroundColor Green
