export type AcceptedMessage = {
	message: string
}

export type Collection = {
	items: Items
}

export type Items = {
	totalitems: string
	termsofuse: string
	pubdate: string
	item: Item[]
}

export type Item = {
	objecttype: string
	objectid: string
	subtype: string
	collid: string
	name: Name
	yearpublished: string
	image: string
	thumbnail: string
	status: Status
	numplays: string
	originalname?: string
}

export type Name = {
	sortindex: string
	$t: string
}

export type Status = {
	own: string
	prevowned: string
	fortrade: string
	want: string
	wanttoplay: string
	wanttobuy: string
	wishlist: string
	preordered: string
	lastmodified: string
}
