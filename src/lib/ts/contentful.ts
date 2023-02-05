import * as contentful from 'contentful';

let client: contentful.ContentfulClientApi | null = null;

try {
	client = contentful.createClient({
		accessToken: 'yR6tCb_CLFACkiM9m9i1PO3DUI7V7usT3sUyw8CefJg',
		space: 'qspoy5tm6shj'
	});
} catch (error) {
	console.log('Errore durante il collegamento con il CMS');
	console.error(error);
	client = null;
}

export default client;