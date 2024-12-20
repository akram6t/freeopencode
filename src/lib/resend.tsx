import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);



export const sendVerificationEmail = async (name: string, emailTo:string, verificationLink: string) => {
    try {
        const { error } = await resend.emails.send({
            from: process.env.RESEND_SEND_FROM!,
            to: emailTo,
            subject: 'Verify your email address',
            react: EmailTemplate({ name, verificationLink }),
        });        

        if (error) {
            return { error: "Internal resend api error" }
        }

        return { success: true }

    } catch (error) {
        return { error: "Internal resend api error" }
    }
}



// components/email-template.tsx
interface EmailTemplateProps {
    name: string;
    verificationLink: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
    name,
    verificationLink
}) => (
    <div>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        </head>
        <div style={{
            fontFamily: 'Inter, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
            <img
                src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
                alt="Logo"
                style={{
                    width: '120px',
                    marginBottom: '24px'
                }}
            />
            <h1 style={{
                color: '#1a1a1a',
                fontSize: '24px',
                marginBottom: '16px'
            }}>
                Verify your email address
            </h1>
            <p style={{
                color: '#4b5563',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '24px'
            }}>
                Hi {name},
            </p>
            <p style={{
                color: '#4b5563',
                fontSize: '16px',
                lineHeight: '24px',
                marginBottom: '32px'
            }}>
                Thank you for signing up! Please click the button below to verify your email address and complete your registration.
            </p>
            <a
                href={verificationLink}
                style={{
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontWeight: '600',
                    fontSize: '16px'
                }}
            >
                Verify Email Address
            </a>
            <p style={{
                color: '#6b7280',
                fontSize: '14px',
                marginTop: '32px',
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px'
            }}>
                If you didn't create an account, you can safely ignore this email.
            </p>
            <p style={{
                color: '#6b7280',
                fontSize: '14px',
                marginTop: '16px'
            }}>
                This link will expire in 24 hours.
            </p>
        </div>
    </div>
);