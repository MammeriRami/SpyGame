const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const words = [
    'tfah', 'banan', 'tchina', 'sa3a', 'dla3',
    'f9ous', 'mandarina', 'pizza', 'tacos', 'chwya',
    'trikou', 'srwale', 'chort', 't9chir', 'salle',
    'sabat', 'caskita', 'chwrma', 'mlfouf', 'yaourt',
    'basketball', 'handball', 'volleyball', 'football', 'pessin',
    'ziit', 'selat', 'masjed', 'hkaya', 'm9l9',
    'frehan', 'telekoumend', 'television', 'dimo', 'frigdar',
    'cousina', 'choumbra', 'batima', 'dar', 'twlat',
    'douche', 'bab', 'ta9a', 'ridou', 'machta',
    'bata', 'flash disqe', 'mantte', 'clivier', 'souris',
    'ecran', 'xbox', 'playstation', 'casque', 'kitman',
    'bluethouth', 'wifi', 'modem', 'telephone', 'oppo',
    'sumsong', 'iphone', 'sachi', 'pc', 'triplat',
    'trisiti', 'lma', 'lgaz', 'saboun', 'l3rbe',
    'lyahoud', 'm5ouda', 'kiwi', '9arse', '5ou5',
    'tfla', 'tfle', 'l3sle', 'datashow', '',
    'Argentina', 'Brazil', 'Canada', 'Denmark', 'Egypt',
    'France', 'Germany', 'Spain', 'Qatar', 'Portugal',
    'Russia', 'bus', 'velo', 'taxi', 'moto',
    'helicopter', 'tram', 'tiara', '9itar', 'bateau',
    'l8achi', 'laposte', 'la caps', 'l complex', 'match',
    '9hwa', 'tea', 'kawkaw', 'lous', 'lcream',
    'chikoula', 'dou5an', 'ztla', '12 nt3 lil', 'algeria',
    'tounse', 'lmroco', 'l"malik', 'kleb', 'ma s3ida',
    'gazouz', 'hamoud bou3lam', 'coca cola', 'pepsi', 'cherry',
    'batna', 'alger', 'constatntine', 'setif', 'tgourt',
    'forno', 'frmage', 'kachire', 'shampio', 'saboun',
    'Adolf Hitler', 'messi', 'ronaldo (R9)', 'C.ronaldo ', 'maldini',
    'neymar', 'mbappe', 'halland', 'Protein', 'militaire',
    'mouckle', 'alarm', 'internet', 'nwathre', 'shitan',
    'youtube', 'instagram', 'facebook', 'counterstrike', 'jeu video',
    'fifa', 'pro', 'projet', 'phobya', 'kroos',
    'neuer', 'braca', 'real madird', 'euro', '1000 DA',
    'snapchat', 'visa', 'controle', 'ratrapage', 'livraison',
    '58 Wilaya', 'occasion', 'prix', 'algercentre', 'GARANTIE',
    'souma', 'jdid', 'lgdim', '2024', '2020',
    'covid', 'racism', 'mi-temps', 'coupe de monde', 'sahbek',
    '8dwa', 'lbarh', 'ORIGINAL', 'Email', 'Blida',
    'bsla', 'lbhare', 'jble', 'trig', 'joumba',
    'loubya', 'jam3a', 'lycee', 'fsdis', 'chemse',
    '9mre', 'zarfa', 'loup-garou', 'stade', 'm9la',
    'slah', 'lpolice', 'jadrmya', 'security', 'rami',
    'tbib', 'frmli', 'sbitar', 'pharmacy', 'medicament',
    'ndjma', 'MUSIC', 'Official', 'zombie', 'film',
    'serie', 'la casa', 'netflix', 'ria', 'rap'
   
];
let players = [];
let spyIndex = -1;
let chosenWord = '';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/start', (req, res) => {
    const numPlayers = parseInt(req.body.players, 10);
    if (numPlayers < 3) {
        return res.render('index', { error: 'Number of players must be at least 3' });
    }

    players = new Array(numPlayers).fill('');
    spyIndex = Math.floor(Math.random() * numPlayers);
    chosenWord = words[Math.floor(Math.random() * words.length)];

    res.redirect('/player/0');
});

app.get('/player/:id', (req, res) => {
    const playerId = parseInt(req.params.id, 10);
    if (playerId >= players.length) {
        return res.redirect('/');
    }

    const message = playerId === spyIndex ? 'NTA Houwa spy. al3bha t3rfe lklma .' : `The word is: ${chosenWord}`;
    res.render('player', { message, nextPlayer: playerId + 1, totalPlayers: players.length });
});

app.listen(port, () => {
    console.log(`Spy Game app listening at http://localhost:${port}`);
});
