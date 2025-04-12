document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    let activeTab = 'binary-to-decimal';
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            activeTab = this.getAttribute('data-tab');
            
            // Update tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(activeTab).classList.add('active');
            
            // Clear inputs and results
            resetForm();
        });
    });
    
    // Convert button click
    const convertButton = document.getElementById('convert-button');
    convertButton.addEventListener('click', function() {
        if (activeTab === 'binary-to-decimal') {
            convertBinaryToDecimal();
        } else {
            convertDecimalToBinary();
        }
    });
    
    // Reset button click
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetForm);
    
    // Binary to decimal conversion
    function convertBinaryToDecimal() {
        const binaryInput = document.getElementById('binary-input').value.trim();
        const errorElement = document.getElementById('binary-error');
        const resultElement = document.getElementById('decimal-result');
        
        // Validate input
        if (!binaryInput) {
            errorElement.textContent = 'Please enter a binary number';
            return;
        }
        
        if (!/^[01]+$/.test(binaryInput)) {
            errorElement.textContent = 'Input must contain only 0s and 1s';
            return;
        }
        
        try {
            // Convert binary to decimal
            const decimal = parseInt(binaryInput, 2);
            resultElement.textContent = decimal.toString();
            errorElement.textContent = '';
            
            // Add copy functionality
            resultElement.innerHTML = `${decimal} <button class="copy-btn">Copy</button>`;
            addCopyListener(resultElement.querySelector('.copy-btn'), decimal.toString());
        } catch (e) {
            errorElement.textContent = 'Invalid binary number';
        }
    }
    
    // Decimal to binary conversion
    function convertDecimalToBinary() {
        const decimalInput = document.getElementById('decimal-input').value.trim();
        const errorElement = document.getElementById('decimal-error');
        const resultElement = document.getElementById('binary-result');
        
        // Validate input
        if (!decimalInput) {
            errorElement.textContent = 'Please enter a decimal number';
            return;
        }
        
        if (!/^\d+$/.test(decimalInput)) {
            errorElement.textContent = 'Input must contain only digits';
            return;
        }
        
        try {
            const num = parseInt(decimalInput, 10);
            
            if (num < 0) {
                errorElement.textContent = 'Input must be a positive number';
                return;
            }
            
            // Convert decimal to binary
            const binary = num.toString(2);
            resultElement.textContent = binary;
            errorElement.textContent = '';
            
            // Add copy functionality
            resultElement.innerHTML = `${binary} <button class="copy-btn">Copy</button>`;
            addCopyListener(resultElement.querySelector('.copy-btn'), binary);
        } catch (e) {
            errorElement.textContent = 'Invalid decimal number';
        }
    }
    
    // Reset form function
    function resetForm() {
        // Clear inputs
        document.getElementById('binary-input').value = '';
        document.getElementById('decimal-input').value = '';
        
        // Clear errors
        document.getElementById('binary-error').textContent = '';
        document.getElementById('decimal-error').textContent = '';
        
        // Reset results
        document.getElementById('decimal-result').textContent = 'Result will appear here';
        document.getElementById('binary-result').textContent = 'Result will appear here';
    }
    
    // Function to add copy functionality
    function addCopyListener(button, text) {
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(text).then(() => {
                // Show copied message
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        });
    }
    
    // Style for copy button
    const style = document.createElement('style');
    style.textContent = `
        .copy-btn {
            background: none;
            border: none;
            color: #00acc1;
            cursor: pointer;
            font-size: 12px;
            margin-left: 10px;
        }
        .copy-btn:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
});
