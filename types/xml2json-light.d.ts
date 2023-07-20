declare module 'xml2json-light' {
	// Type for the returned object from xml2json function
	type JsonObject = { [key: string]: string | JsonObject | JsonObject[] }

	// Main function. Clears the given xml and then starts the recursion
	export function xml2json(xmlStr: string): JsonObject

	// Recursive function that creates a JSON object with a given XML string
	export function xml2jsonRecurse(xmlStr: string): JsonObject

	// Removes some characters that would break the recursive function
	export function cleanXML(xmlStr: string): string

	// Replaces all the self-closing tags with attributes with another tag containing its attribute as a property
	export function replaceSelfClosingTags(xmlStr: string): string

	// Replaces all the tags with attributes and a value with a new tag
	export function replaceAloneValues(xmlStr: string): string

	// Replaces all the tags with attributes with another tag containing its attribute as a property
	export function replaceAttributes(xmlStr: string): string
}
