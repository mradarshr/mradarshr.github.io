function sendPostRequest() {
      // Extract the path from the query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const pathAfterHost = urlParams.get('path');

      // Construct the URL for the POST request
      const postUrl = 'https://m.mathconversion.org/best-ivf-clinics-in-bengaluru-for-fertility-treatments-and-success-rates/';

      // Prepare the headers for the POST request
      const headers = {
        'Cookie': `pid=; tid=; plan=1; furl=; id=; aliass=; img=; site=e; username=; video=; filename=; size=; date=; views=; report=; url=https://m.open2get.in${pathAfterHost}; __gads=ID=9a2fa29b3b5fd8f5:T=1739679376:RT=1739681154:S=ALNI_MbiFS7HWbeIrrWfij7luTckpgzSvA; __gpi=UID=0000103bb6cd9aa2:T=1739679376:RT=1739681154:S=ALNI_Mbwo6JraE2X-_tP3LNYVyTyeFIKqA; __eoi=ID=20416b18bba563b4:T=1739679376:RT=1739681154:S=AA-AfjbfV-ngU4mOU0msPFo-qgrj`,
        'Origin': 'https://m.mathconversion.org',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36',
        'Referer': 'https://m.mathconversion.org/best-orthopedic-hospitals-in-chennai-for-joint-replacement-and-spine-surgery/',
        'Content-Length': '2474'
      };

      // Prepare the body for the POST request
      const body = new URLSearchParams({
        'vip1': '4',
        'g-recaptcha-response': '03AFcWeA6tUZM3_5OiZWj_xvVtMqR8CpFUUIs3t51FlGioXHFIMM1PQt1o5ZIfy1a8rknxT25YXTI40iD9B7XuHTvRgaZP9jXAgskjAMFdqOOfuoca9hd35Y8ic-NBBghHzzLqTz_Gzug9WDKvxTrpuPqcgQ_lkSwWk7FxtZaq1btFGczCq6ijcEE3lEs7rSnKdOXbdnvvI4_F4yznzm_VZ5c2w9t3SPd6RL0iLOhVbBOfvrGqc415FGWwWXUdWW97n3W74DaJ-mKut5D4tWZDxjCOEnMhSba7pKGwElM4qWSZve0n28mH4I_36OEQVD2WzYbP0zBnXWJ55plHlwsCv2vIWtEODcCC01h_xgXO3PI_jIcgTrCU22FYKKOGqHlG6tC2-lqo8vYOEB4QGpdDlajGRJNgBqDmuji5uC6UI2GeLYfyoU3VXSEji9OGniaVBMc58NEqxi0aWQtvcRqSscvimdAX3zU_FuUbJlHl0FIFZ1QDBoNzNnaa9c-1qvY7xJhE8du-8LsBdUcYrZUVlIycN8Z_WZ8R1fsJwVleCBB2TBn4-Yx_DloP1YDs_xbrXd3c5VlTB9aoSRhpvzJdmMPl3lrsIRQN_sg6y4W46mrYG_ULEcpQ1iXh2SRhD2bbNYWZNyQoU4mVI1_Ofv87l64wZbnsXC7Zs-a3juzTQKPCn6m3NXY6RRZDt8oJi8r3KhcoKRb0Jw5SDPFEtSYX6ttwLmmUsgGf9AlsNz1nFZ7VAmyaz9XycvO-2_2aGLSxkEkfLiO4swm6soh5Y9or4IdJSzHRG3wfZ54ADiQBwpDAgU_2Qo1aOAtVTOhjDH7v78NIWygqyv7GPo8_gjn4p_YDbqoDLtpSrbRiEGg61UFw9FrTS6Wbx0_VvZqF3BBkD8qMAM06d5KpW3a1YDOqfawJw6UxOHaIn-3JuB-3SDaSs_ry_1OFimM4JNT6wbX-BFZCWvAaLLbFcwuArLLxyeBJGHgm43O7IEIlFHdRCMOtDS72qUsW8UqmM5tvB0W7YZ3x-CEeXtb4vw4A6LFgpm1KD5rQ1C8bzpsbedf_NKFrjCJOunvo3AD4_F76yUZKk9qICSoiRYHFuoscIj9lsQR0lAkDT_J11xuKRiQQ0Wwvr7F9hjtvsO6-pkvlCepUF-rlQ-YtilFwlHeLbBbKMX-idNnBqCRXZ5jCUGjrPGUpY_sSpsFnaIRgbuQUgo4oukn-cJ8RfOF4tPMuSBZbi6bFLolDsE4MghBhObZ85zUwMCWjvK-RF0WZ3DTzU7iRpZExQWfosK9NEBTCPBaIQmH-of2-OxWWsbSL4Cz7V3n5ub1pQKk3s-nQG0rdkIQar1jBUjEIfhK0sdbfXwiRZ-yG4kO2u5XZPaX3lS_w5yYEIDe47wJoK3muW5LiKznCQ9jfwXhrRyd7UN1lgEZdaStCdhxTV_1sPl4dvtSlxGagp_Ua5v1E3G3ZzIXIuA_nqqQVXWvrB48TZzEhcMJHl22h3gEQxhLpMReIgqYfh2KUdCAQ4REoWn5WU4rVpkj8U4-hkzoJbDZlihH_b0PFlvVVwoyuLSYCNmI8mykw-frwJCfJdvOf6R8UXLsXniKN5kYEjZgOKfVpSI9PTPpvJptA8TGqAERladgdCp7quuEOwMFs6qrqt7UfkwDWAy2Il4Z_O5MpCg6JHqisvnTjSqyME_H5yptZpJ0TjysqReIUVnUfWbFvp6A_Mgn3vp3ZwqsCdSmtyj3jo6Sr3P0i5ORfJAJe2TGNmhoQn1x3A_ZREf7Ny7omGvNiV0j41OTYRR2jzjBSOClMqMRjQ92N1I_pffatA8XJ3Nfyrv-ex7Z67d2wzLIUrHfqBKaJpdkMxIApNPehVC1NWcEsqZpLgpAGGUe11sqc3BDRO5Sm1o2gEFUyWmvEArXG-KpaMPxC94VcD4N82SHSMCKhmX6dzaPUpiqFNF2RkNZVJtQmOzYMYGNutpGeY7f0HZvzheY9TpeaH04Rr_TzXu7aPZQBzxYOq33hjg7jVvozXI26xer92Ux8JT3k1VQvU2t49CYRzK9itIivTqYiGZLTHLOimbiePaKHUAwu_Vh2BJ0Nn7WEIIdtPprMgV5jY0dkmCVsvheeZUD-n96_S5DByCGGUNCAHbeoJMi6K8h2oTg1sHWITcCccYe05HpYd0pFJPyRyU6NPXfKXIKeHUjnWRAzdBo2-6_5YKf-KbnKJRvqxs39ZQjlrO-qu2yfpriMqN609t1lhbnfuLDKGqAkAn6QqEPLU64s2ncKYkw9bjocseRyHAu4kYOHa30P4SAvU00ioIzcluiCDZItPJ_kUpr0MDs4iS1bhlfIs-KiWf-Plvl3Y_rwONwvQDdD1IHzR0QUC392gvN8fh6zpti7wnJdahaE0o3n_2f2eLphavq511qfgS2YmcBp4HA-5S3oxpIX4V0nhS_wzjZX'
      });

      // Send the POST request
      fetch(postUrl, {
        method: 'POST',
        headers: headers,
        body: body
      })
      .then(response => {
        // Handle the response (optional)
        console.log('POST request sent successfully!');
      })
      .catch(error => {
        console.error('Error sending POST request:', error);
      });
    }

    // Automatically send the POST request when the page loads
    window.onload = sendPostRequest;
