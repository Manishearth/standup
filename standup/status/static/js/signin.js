$(function() {
    var clientID = $('meta[name="auth0-client-id"]').attr('content');
    var domain = $('meta[name="auth0-domain"]').attr('content');
    var callbackURL = $('meta[name="auth0-callback-url"]').attr('content');

    var lock = new Auth0LockPasswordless(clientID, domain);

    $('.signin-link form').on('submit', function(event) {
        event.preventDefault();
        var options = {
            callbackURL: callbackURL,
            connections: ['github'],
            authParams: {
                scope: 'email name'
            },
            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDEyLjQ4NyIgaGVpZ2h0PSI1NzEuMjM3Ij48ZyBmaWxsPSIjNGU0ZjU3Ij48cGF0aCBkPSJNMTk0LjQwNyAyMTQuNDZjMy4zODIgNS4yMiA0Ljg3MyA5Ljg3NiA2Ljc2MiAxOS43IDEzLjIyMy0xMi45MDggMjkuNTMtMTkuNyA0Ny4zMjYtMTkuNyAxNi4wNzQgMCAyOS4yNjUgNS4yMiAzOS40NzMgMTUuODc0IDIuNzUgMi42NyA1LjQgNi4xMTUgNy42OSA5LjQ5NiAxNy43Ni0xOC4xOTQgMzMuNjctMjUuMzcgNTQuOTgtMjUuMzcgMTUuMTggMCAyOS41NjQgNC41NCAzOC4zNDggMTIuMDk2IDEwLjk3IDkuNDggMTQuNDQ4IDIwLjg3OCAxNC40NDggNDcuNDEzVjQxMi4wMkgzNTQuMTJWMjgzLjg2YzAtMjMuMjMzLTIuNzUtMjcuNzI1LTE1Ljk3NC0yNy43MjUtOS40OCAwLTIyLjggNi40NjUtMzMuNzQgMTYuMzI0bC4wMDIgMTM5LjU2M2gtNDguMTI0VjI4NS42OGMwLTI0LjIyNC0zLjUxLTI5LjkxLTE3LjYzLTI5LjkxLTkuMzggMC0yMi4zNzMgNC44NTgtMzMuMzEgMTQuNzY2djE0MS40ODdIMTU1LjdWMjc2LjZjMC0yOC4wNC0xLjkyMy00MC4xNS03LjI1OC00OS42NzhsNDUuOTY4LTEyLjQ2Mk00OTMuNjIgMjcxLjI5N2MtMy40ODMgMTAuMjc1LTUuMzM2IDIzLjkxNC01LjMzNiA0My4yNyAwIDIyLjMyIDIuMjg1IDM5LjA5MiA2LjQyNyA0OC45MTcgNC41NzUgMTAuNjI0IDE2LjAxIDE1LjkyNiAyNS43ODUgMTUuOTI2IDIyLjAxIDAgMzEuNDItMTkuNzAzIDMxLjQyLTY1LjU4OCAwLTI2LjE4Ni0zLjQxNC00My4yODYtMTAuMjA2LTUyLjAzMy00Ljg3Ni02LjQtMTIuNzk1LTEwLjIxLTIxLjk0My0xMC4yMS0xMi4xNjIgMC0yMi4wNCA3LjU1NS0yNi4xNDggMTkuNzE3em05MS4zNy0yOC4wMzZjMTUuNTEgMTguMTk2IDIyLjQ0IDM5LjQyMiAyMi40NCA3MC44OTQgMCAzMy4zNzMtNy42NTYgNTYuMTcyLTI0LjM5NSA3NS4wOTgtMTQuNzE0IDE2LjY3Mi0zNC4xMDIgMjYuOTQ3LTYzLjk5NyAyNi45NDctNTIuNzk1IDAtODcuMjMtMzkuNDYtODcuMjMtMTAwLjQ5IDAtNjEuMDg1IDM0Ljc5OC0xMDEuNjgzIDg3LjIzLTEwMS42ODMgMjcuNjczIDAgNDkuMjgzIDkuNTE0IDY1Ljk1MiAyOS4yMzRNNzcwLjg4NSAyMTcuODR2MzQuODk2bC04NS43NyAxMjQuMDA1aDg5LjEybC0xMi4xNjUgMzUuMjgySDYxOS4xNjJ2LTMxLjQ2OGw5MS4zMDgtMTI3LjA1aC04My42ODhWMjE3Ljg0aDE0NC4xMDNNODUwLjg2MiAyMTMuMjY2djE5OC43NTZoLTUwLjgxdi0xOTAuNzdsNTAuODEtNy45ODZ6bTUuOTY0LTQ4Ljg4NmMwIDE3LjQ3LTEzLjg4NyAzMS40Mi0zMS40NSAzMS40Mi0xNy4wMDUgMC0zMC45ODgtMTMuOTUtMzAuOTg4LTMxLjQyIDAtMTcuNDMzIDE0LjQ1LTMxLjUgMzEuODQ1LTMxLjUgMTcuMDM3IDAgMzAuNTkzIDE0LjA2NyAzMC41OTMgMzEuNU05NDMuMzk0IDE4MS44NXYxNTEuMjk0YzAgMzMuNDIyLjM5OCAzNy45MTUgMy40NDggNDMuMjE3IDEuOTIyIDMuNDQ2IDYuMDMgNS4zMDUgMTAuMjc0IDUuMzA1IDEuODIzIDAgMi45MTUgMCA1LjY2Ni0uN2w4LjY4NCAzMC4zMWMtOC42ODQgMy4zOTYtMTkuMzIgNS4yOS0zMC4zMjIgNS4yOS0yMS42NzggMC0zOS4xMS0xMC4yMTMtNDUuMTQ1LTI2LjQ4NS0zLjgxLTkuODc1LTQuNjQtMTUuOTczLTQuNjQtNDMuNjQ2VjIwMS41YzAtMjUuMzg4LS42Ni00MC45LTIuNTU0LTU4LjQxNGw1MS45Ny0xMS43NWMxLjgyMyAxMC42MSAyLjYxOCAyMy4xMzUgMi42MTggNTAuNTE0TTEwNDguNzg1IDE4MS44NXYxNTEuMjk0YzAgMzMuNDIyLjQzNCAzNy45MTUgMy41NSA0My4yMTcgMS43ODggMy40NDYgNS44OTYgNS4zMDUgMTAuMTQgNS4zMDUgMS45MjMgMCAzLjA4MyAwIDUuNzY2LS43bDguNjU0IDMwLjMxYy04LjY1MyAzLjM5Ni0xOS4yOTMgNS4yOS0zMC4zMyA1LjI5LTIxLjYzOCAwLTM5LjEwNC0xMC4yMTMtNDUuMTctMjYuNDg1LTMuODc2LTkuODc1LTQuNTA4LTE1Ljk3My00LjUwOC00My42NDZWMjAxLjVjMC0yNS4zODgtLjc2LTQwLjktMi43MTctNTguNDE0bDUxLjktMTEuNzVjMi4wOSAxMC42MSAyLjcxNSAyMy4xMzUgMi43MTUgNTAuNTE0TTExOTQuMzggMzI3LjA4Yy0zNS4xMyAwLTQ3LjQ1OCA2LjM5NS00Ny40NTggMjkuNjI3IDAgMTUuMTEyIDkuNjEyIDI1LjM1MyAyMi41MDIgMjUuMzUzIDkuNDQ2IDAgMTguOTkzLTQuOTM4IDI2LjUxNy0xMy4yNTZsLjgzLTQxLjcyNWgtMi4zOXptLTY1Ljg1NC0xMDIuMDE2YzE4Ljg5NC03Ljk4OCAzNS4xMzYtMTEuMzcgNTMuMDMtMTEuMzcgMzIuNjggMCA1NS4wMTggMTIuMSA2Mi42NyAzMy43NCAyLjUyIDcuOTU3IDMuNjggMTQuMDIyIDMuNDUgMzQuODk4bC0xLjIyOCA2NS4xOTV2My40NDRjMCAyMC44NSAzLjQ0OCAyOC44MzYgMTguMzAyIDM5LjgxbC0yNi45ODMgMzEuMTVjLTExLjg2OC00Ljk3LTIyLjQzNy0xMy43Mi0yNy4zNzgtMjMuNTQ4LTMuNzQ1IDMuODMtNy45NTUgNy41NDItMTEuOCAxMC4yMjUtOS40MSA2LjgzLTIzLjE2NCAxMC42NC0zOS4wNzUgMTAuNjQtNDMuMjQ4IDAtNjYuNzQ1LTIyLjA0LTY2Ljc0NS02MC42NSAwLTQ1LjU4NyAzMS41NS02Ni44NSA5My4zMjUtNjYuODUgMy43MTQgMCA3LjIyNiAwIDExLjQzNi40MzJ2LTcuOTJjMC0yMS42Ni00LjIxLTI4Ljg3LTIyLjktMjguODctMTYuMTA4IDAtMzUuMjMgNy45Mi01Ni4wNDYgMjEuOTlsLTIxLjY0Mi0zNi40MjJjMTAuMzA4LTYuNDY1IDE3LjktMTAuMjI1IDMxLjU4NC0xNS44OTQiLz48L2c+PC9zdmc+',
            primaryColor: '#d7d3c8',
        };
        lock.socialOrEmailcode(options);
    });

});
