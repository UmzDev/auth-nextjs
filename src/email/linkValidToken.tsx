export const linkValidToken = (
  userFirstName: string,
  resetPasswordLink: string
) => {
  return (
    <html>
      <body style={{ backgroundColor: '#f6f9fc', padding: '10px 0' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0', padding: '45px', margin: '0 auto', maxWidth: '600px' }}>
        
          <div>
            <p style={{ fontSize: '16px', fontFamily: "'Open Sans', sans-serif", fontWeight: '300', color: '#404040', lineHeight: '26px' }}>
              Hi {userFirstName},
            </p>
            <p style={{ fontSize: '16px', fontFamily: "'Open Sans', sans-serif", fontWeight: '300', color: '#404040', lineHeight: '26px' }}>
              You have requested to reset your password. Click the button below to set a new password.
            </p>
            <a href={resetPasswordLink} style={{
              backgroundColor: '#007ee6',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'inline-block',
              width: '210px',
              padding: '14px 7px',
              margin: '20px 0'
            }}>
              Reset Password
            </a>
            <p style={{ fontSize: '16px', fontFamily: "'Open Sans', sans-serif", fontWeight: '300', color: '#404040', lineHeight: '26px' }}>
              If you did not request this change, please ignore this email.
            </p>
            <p style={{ fontSize: '16px', fontFamily: "'Open Sans', sans-serif", fontWeight: '300', color: '#404040', lineHeight: '26px' }}>
              For more security tips, visit our Help Center.
            </p>
            <p style={{ fontSize: '16px', fontFamily: "'Open Sans', sans-serif", fontWeight: '300', color: '#404040', lineHeight: '26px' }}>
              Best regards!
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default linkValidToken;