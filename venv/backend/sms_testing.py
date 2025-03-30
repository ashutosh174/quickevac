import smtplib

def send_sms_via_email(phone, carrier, message):
    # Carrier SMS gateway domains (USA examples)
    gateways = {
        "bell": "@txt.bell.ca",
    }

    if carrier not in gateways:
        print("Carrier not supported")
        return

    recipient = phone + gateways[carrier]
    
    # Configure email
    sender_email = "190953131026cse@gmail.com"
    sender_password = "bjhgxxfifszfjjoe"
    
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, sender_password)
    
    server.sendmail(sender_email, recipient, message)
    server.quit()
    
    print("SMS sent successfully!")

send_sms_via_email("4167179279", "bell", "Hello! This is a free SMS via email.")