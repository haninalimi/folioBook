 document.addEventListener('DOMContentLoaded', function() {
            // Step navigation
            const nextToStep2 = document.getElementById('nextToStep2');
            const nextToStep3 = document.getElementById('nextToStep3');
            const backToStep1 = document.getElementById('backToStep1');
            const backToStep2 = document.getElementById('backToStep2');
            const newBooking = document.getElementById('newBooking');
            const progressBar = document.getElementById('progressBar');
            
            // Service selection
            const serviceCards = document.querySelectorAll('.service-card');
            let selectedService = null;
            
            // Date and time selection
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            const calendarDays = document.getElementById('calendarDays');
            const timeSlots = document.querySelectorAll('.time-slot:not(.disabled)');
            let selectedDate = null;
            let selectedTime = null;
            
            // Form sections
            const formSections = document.querySelectorAll('.form-section');
            const steps = document.querySelectorAll('.step');
            
            // Initialize calendar
            initializeCalendar();
            
            // Service card selection
            serviceCards.forEach(card => {
                card.addEventListener('click', function() {
                    serviceCards.forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedService = this.getAttribute('data-service');
                    
                    // Update summary
                    document.getElementById('summary-service').textContent = this.querySelector('h3').textContent;
                    document.getElementById('summary-total').textContent = this.querySelector('.service-price').textContent;
                    
                    // Enable next button
                    nextToStep2.disabled = false;
                });
            });
            
            // Time slot selection
            timeSlots.forEach(slot => {
                slot.addEventListener('click', function() {
                    timeSlots.forEach(s => s.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedTime = this.textContent;
                    
                    // Update summary
                    document.getElementById('summary-time').textContent = selectedTime;
                    
                    // Enable next button if date is selected
                    if (selectedDate) {
                        nextToStep3.disabled = false;
                    }
                });
            });
            
            // Step navigation handlers
            nextToStep2.addEventListener('click', function() {
                if (!selectedService) return;
                
                navigateToStep(2);
            });
            
            nextToStep3.addEventListener('click', function() {
                if (!selectedDate || !selectedTime) return;
                
                // Update confirmation details
                document.getElementById('confirm-service').textContent = 
                    document.querySelector('.service-card.selected h3').textContent;
                document.getElementById('confirm-datetime').textContent = 
                    `${selectedDate} at ${selectedTime}`;
                document.getElementById('confirm-client').textContent = 
                    `${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`;
                document.getElementById('confirm-email').textContent = 
                    document.getElementById('email').value;
                
                navigateToStep(3);
            });
            
            backToStep1.addEventListener('click', function() {
                navigateToStep(1);
            });
            
            backToStep2.addEventListener('click', function() {
                navigateToStep(2);
            });
            
            newBooking.addEventListener('click', function() {
                // Reset form
                document.getElementById('bookingForm').reset();
                serviceCards.forEach(c => c.classList.remove('selected'));
                timeSlots.forEach(s => s.classList.remove('selected'));
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                selectedService = null;
                selectedDate = null;
                selectedTime = null;
                
                navigateToStep(1);
            });
            
            // Calendar navigation
            prevMonthBtn.addEventListener('click', function() {
                // In a real app, this would go to previous month
                console.log('Previous month');
            });
            
            nextMonthBtn.addEventListener('click', function() {
                // In a real app, this would go to next month
                console.log('Next month');
            });
            
            // Form submission
            document.getElementById('bookingForm').addEventListener('submit', function(e) {
                e.preventDefault();
                navigateToStep(4);
                
                // In a real app, you would send the data to the server here
                console.log('Form submitted', {
                    service: selectedService,
                    date: selectedDate,
                    time: selectedTime,
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    company: document.getElementById('company').value,
                    notes: document.getElementById('notes').value,
                    serviceNotes: document.getElementById('service-notes').value
                });
            });
            
            function navigateToStep(step) {
                // Hide all sections
                formSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show current section
                document.getElementById(`section${step}`).classList.add('active');
                
                // Update progress steps
                steps.forEach((stepEl, index) => {
                    if (index < step - 1) {
                        stepEl.classList.add('completed');
                        stepEl.classList.remove('active');
                    } else if (index === step - 1) {
                        stepEl.classList.add('active');
                        stepEl.classList.remove('completed');
                    } else {
                        stepEl.classList.remove('active', 'completed');
                    }
                });
                
                // Update progress bar
                progressBar.style.width = `${(step - 1) * 33.33}%`;
            }
            
            function initializeCalendar() {
                // In a real app, this would generate days for the current month
                // For demo purposes, we'll just generate some days
                const daysInMonth = 30;
                const startingDay = 3; // Wednesday
                
                // Clear existing days
                calendarDays.innerHTML = '';
                
                // Add empty cells for days before the 1st
                for (let i = 0; i < startingDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day disabled';
                    calendarDays.appendChild(emptyDay);
                }
                
                // Add days of the month
                for (let i = 1; i <= daysInMonth; i++) {
                    const day = document.createElement('div');
                    day.className = 'calendar-day';
                    day.textContent = i;
                    
                    // Mark today (for demo, we'll say it's the 15th)
                    if (i === 15) {
                        day.classList.add('today');
                    }
                    
                    // Disable weekends (for demo)
                    const dayOfWeek = (i + startingDay - 1) % 7;
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        day.classList.add('disabled');
                    } else {
                        // Add click handler for available days
                        day.addEventListener('click', function() {
                            document.querySelectorAll('.calendar-day').forEach(d => {
                                d.classList.remove('selected');
                            });
                            
                            this.classList.add('selected');
                            selectedDate = `June ${i}, 2023`;
                            
                            // Update summary
                            document.getElementById('summary-date').textContent = selectedDate;
                            
                            // Enable next button if time is selected
                            if (selectedTime) {
                                nextToStep3.disabled = false;
                            }
                        });
                    }
                    
                    calendarDays.appendChild(day);
                }
            }
        });