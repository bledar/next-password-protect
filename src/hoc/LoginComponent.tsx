import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface LoginComponentProps {
  apiPath: string;
}

export const LoginComponent = ({ apiPath }: LoginComponentProps) => {
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBusy) {
      return;
    }

    setBusy(true);
    setError('');

    try {
      const form = document.querySelector(
        '#password-form form',
      ) as HTMLFormElement;

      const formData = new FormData(form);

      const res = await fetch(`/api${apiPath}`, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify({ password: formData.get('password') }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { message } = await res.json();

      if (res.status === 200) {
        router.reload();
      } else {
        setError(message);
        setBusy(false);
      }
    } catch (e) {
      setError('An error has occured.');
      setBusy(false);
    }

    return false;
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '32px 16px',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');

            @font-face {
              font-family: 'Filson W01';
              src: url('data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAaEAA4AAAAADxwAAAYyAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbgU4cGgZgAFQRCAqEIINrCxQAATYCJAMkBCAFklcHRBvdDVGUUFIy2RcH5ummPBDhXWGrdtOFn25gkD+tAT+UCzmAk0Y8vI7l+23vbgAUz+yANKtlagqd4PhNCIcG5VXVA2Vm8do7D7g2k7ORPQG+r0shPZfxr8k902G9ztXFgggSy08SvHrvvpZAut22fS+Y5FZICUQePkVY/o8D/P1aU+2aT37pByExhEpopN23+/7Jw/zj2k61YRqiTacx18AzVTx0QiV0QiaSI4TeWKLbCwHae10L9B0LNAGSEOqEQIMRlsiV56m6VWAi0XUWabUgeFGkbGYdXYOO/c4fgZpY9f7f+QT/56v4/0El/9/cNlRkRUVNnZBVhaSCIleJoqrWZ0ZKe/Th4umlz2U5+FRuvgMQe3Y4v27ahwsMQQNj5xJfQM1c9fcVaitfbf6OaePsA4zhICGjC1egC8+2SpM6STEmUo/JL2UZ6UNtlwXmmx1hXob9EQnUgw7QiE/wDaCADAhJEtI4PJ1UoKJ40j4mIqrDtK2ZYuaazby48uLao1u3EoaVjLl27RpoK2oBYXqpsdcB+lriuU2p9GVq7FXCXJGMudRgzDHpkHVck4xhWRZg6VX7k4hMoMqxeZJxySnnr0flWk3FdFZq6sSOuSaTimXFjlloS4OUWAZFjvWDJ+U3trC+doH32z64CZLcaPwNfX1sr7RgzHnw551OPmCMrEPf/cskt2f2+6t1g5WtWyePjGo1DwxSRGid+jCfnR1TfMJTcmODeYHxOdmuT0aofSxGGSxWWRjWSL/YGIT5cIv34M8ph6vJ5KqVbN2h5GHTw8/W14WeYqYdSqkvWJ/mGDo+d0OXz+mqEbPT1uvyfQ5NGPb378aA+PCSAQkh5sMfPGsdtrC6YtTkTnr0gjv0QqxcTS7Nj6krzMutL4yJairMym4sRIsmd2zFootpI91jM+yHmTIR8bleBpMIVWCgwTottrvIC8f2Qx5knVs49W7KlzvJ0Y7sc494iZcKpi8VkjDv56kXEyc/SUjpl5/2BAAAAuBip+f+r9U5xp5fRZQIANz8otYCcEcX8fD/8k9HPa8FugkqdRII+syGpqNJgdZ/X6SpH/n4F+JL/kcqD2aNBNxlHL77o5bRDy4I6u26AQkhsK0CjEQ1asCJSoDQ4EQNkppTNcim5KpB0WYiAiqafSCgqtUXAmoW7UVAnX4fEVCvNSQI0GAt+oKARj2RiBo0FVlzuJFyaqkX70K0GLznUp6FrvJjSUslseyqClgxVodZxUA9ZFUj9ZvV3HZfVme2h7N6I72TNXjq66zR+IgwbGLNWc9vsbTwXk9seq2CpTzmxDOTIkQmnYPD6hr9LUFnB+rf9wAXQMbXA1RXIvn5X62C+WSSkNIQL1bnaxfmX5X9TjdpaVpTbspvaVz0WwNXazscrG0VtYEsZVshzCFWBWWGvJ3ZcKBacH4GV9Mf2ziTxOXlqSZDo6yCw/yvsiCMS+g+5+D1WfyQxEEvnUzPoVPlxOfFK3sf8Dlpqcifuj8Q9U2w2jhFNr0gRrJRHlc1EZNUA+c4vVZy2urpbAJwjL/xcgd8ASBZ3fywuEbXO/nM6eBcBm454POBfgO9wk5OZJjkbx4BRFYo1jtyoFdgSS7GCZsxoiCEmKhZ4MCKXBRhXKAiYlgvgQRuEjGxIWfPlh031uT8nJzAR7IysEvk+s1ItBOMnRiRQEq4Mx7xYnLyL0i/P3+iIiMQTEySSBWNi45yoUgwN0WcoYHoM9xjWOxwYK2C6mMLFQMrf25qYin5Ci5jIA80UkFEzgI1ghodsBpmcCi9XDw7sUBmK7OAksuOLQdNDLtGQCUomWmqilCwyPPjFnlTDWuREsKen+kWFpFSYXaDx8kuMw0bNlritHPT0RUdsUNSfx6wysaXGw/My6KGGWhEx2sDRrWeaHQsm6qlhChSv7BXhGPQ7wEr9WhbjuRsRoUpiT0JtVA5DQRrSARKYSrD74cqAG02GwAMJpoCqjO9Lp9ORC6iyWZPtOlJvEiFjIrsZJvXEVWk7nYdBmW2hcLmoIYOrvES0yFKm4gWTCDv3ZzMmSK/cogMQqoC29mpNmPe3yw4kb3nHflg+eNUgSNW5d+zYleuJ5JwkU0Jd+/F62yq5kMMs5ZA') format('woff2');
              font-weight: 900;
              font-style: normal;
              font-display: swap;
            }

            #password-form * {
              font-family: 'Karla', sans-serif;
            }

            #password-form h1 {
              font-family: 'Filson W01', sans-serif;
            }

            #password-form {
              padding: 40px;
            }

            @media (max-width: 767px) {
              #password-form {
                padding: 32px 16px;
              }
            }

            #password-form .invalid {
              outline: auto 1px;
              outline-color: #DD4A4A;
              animation: shake .4s linear;
            }

            @keyframes shake {
              8%, 41% {
                transform: translateX(-10px);
              }
              25%, 58% {
                transform: translateX(10px);
              }
              75% {
                transform: translateX(-5px);
              }
              92% {
                transform: translateX(5px);
              }
              0%, 100% {
                transform: translateX(0);
              }
            }
          `,
        }}
      />

      <img
        width="130"
        height="85"
        alt="Story of AMS logo"
        src="https://storyofams.com/public/story-of-ams-logo-big.png"
        srcSet="https://storyofams.com/public/story-of-ams-logo-big.png 1x, https://storyofams.com/public/story-of-ams-logo-big@2x.png 2x, https://storyofams.com/public/story-of-ams-logo-big@3x.png 3x"
      />
      <div
        id="password-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          boxShadow: '0px 15px 40px rgba(26, 30, 43, 0.13)',
          borderRadius: '8px',
          width: '420px',
          maxWidth: '100%',
          marginTop: '40px',
          marginBottom: '125px',
        }}
      >
        <h1 style={{ margin: '0 0 24px', color: '#111' }}>Login</h1>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <label
            htmlFor="password"
            style={{
              color: '#525252',
              fontSize: '18px',
              marginBottom: '8px',
            }}
          >
            Password
          </label>
          <input
            className={error ? 'invalid' : ''}
            name="password"
            type="password"
            id="password"
            placeholder="Enter password..."
            required
            style={{
              background: '#F5F5F5',
              borderRadius: '4px',
              padding: '0 16px',
              fontSize: '18px',
              color: '#525252',
              border: 'none',
              height: '48px',
            }}
          />

          <button
            type="submit"
            disabled={isBusy}
            style={{
              appearance: 'none',
              background: '#01EDBC',
              borderRadius: '52px',
              border: 'none',
              padding: '12px 32px',
              fontSize: '20px',
              color: '#111',
              marginTop: '32px',
              cursor: 'pointer',
            }}
          >
            {isBusy ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};