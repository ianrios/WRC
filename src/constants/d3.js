import { filter } from "lodash"
import artistData from "./artistData.json"
import releaseData from "./releaseData.json"
import independentReleaseData from "./independentReleaseData.json"

const nodes = artistData.map(i => { return { id: i.name } })
const combinedData = [...releaseData, ...independentReleaseData]

// TODO: add "is on a release with" data, instead of accidentally saying it is a collab
// convert to database
// create artist table
// create roles table
// create artist roles table (this let us assign roles such as 'producer', 'graphic designer', 'web developer', etc)
// create song table
// create artist song table (this will let us know who was a remixer, primary artist, feature, etc)
// create release table
// create artist release table (this will let us know who was on a release)

const linkObj = {}
for (let r of combinedData) {
	if (r.primary_artist_ids.length > 1) {
		for (let i of r.primary_artist_ids) {
			for (let j of r.primary_artist_ids) {
				const a1 = artistData.find(k => k.id === i)
				const a2 = artistData.find(k => k.id === j)
				if (a1.name != a2.name) {
					const link = { source: a1.name, target: a2.name }
					const str = JSON.stringify(link)
					if (str in linkObj) {
						if ("sourceCollabedWith" in linkObj[str]) {
							linkObj[str]["sourceCollabedWith"]++
						}
						else {
							Object.assign(linkObj[str], { "sourceCollabedWith": 1 })
						}
					} else {
						linkObj[str] = { "sourceCollabedWith": 1 }
					}
				}
			}
		}
	}
	for (let i of r.secondary_artist_ids) {
		for (let j of r.primary_artist_ids) {
			const a1 = artistData.find(k => k.id === i)
			const a2 = artistData.find(k => k.id === j)
			if (a1.name != a2.name) {
				const link = { source: a1.name, target: a2.name }
				const str = JSON.stringify(link)
				if (str in linkObj) {
					if ("sourceFeaturedOn" in linkObj[str]) {
						linkObj[str]["sourceFeaturedOn"]++
					}
					else {
						Object.assign(linkObj[str], { "sourceFeaturedOn": 1 })
					}
				} else {
					linkObj[str] = { "sourceFeaturedOn": 1 }
				}
			}
		}
	}
	for (let i of r.remix_artist_ids) {
		for (let j of r.primary_artist_ids) {
			const a1 = artistData.find(k => k.id === i)
			const a2 = artistData.find(k => k.id === j)
			if (a1.name != a2.name) {
				const link = { source: a1.name, target: a2.name }
				const str = JSON.stringify(link)
				if (str in linkObj) {
					if ("sourceRemixed" in linkObj[str]) {
						linkObj[str]["sourceRemixed"]++
					}
					else {
						Object.assign(linkObj[str], { "sourceRemixed": 1 })
					}
				} else {
					linkObj[str] = { "sourceRemixed": 1 }
				}
			}
		}
	}
}
const links = Object.keys(linkObj).map(i => JSON.parse(i))


// if nodes do not appear in links, remove them
const filteredNodes = nodes.filter(item => {
	const foundSource = links.find(l => l.source === item.id)
	const foundTarget = links.find(l => l.target === item.id)
	if (foundSource || foundTarget) {
		return item
	}
});

console.log({ nodes, links, linkObj, filteredNodes })
const data = {
	linkObj,
	nodes: filteredNodes,
	links
};

export default data;