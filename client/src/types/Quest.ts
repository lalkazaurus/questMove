export interface Quest {
	id: string
	name: string
	description: string
	checkpoints: Array<{
		lat: number
		lng: number
		title: string
		task: string
		question: string
		answer: string
	}>
	createdBy: string
}
