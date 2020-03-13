import artistData from "./artistData.json"
import releaseData from "./releaseData.json"

const nodes = artistData.map(i => { return { id: i.name } })

const links = []
const linkObj = {}
for (let r of releaseData) {
	if (r.primary_artist_ids.length > 1) {
		for (let i of r.primary_artist_ids) {
			for (let j of r.primary_artist_ids) {
				const a1 = artistData.find(k => k.id === i)
				const a2 = artistData.find(k => k.id === j)
				if (a1.name != a2.name) {
					const link = { source: a1.name, target: a2.name }
					links.push()
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
				links.push()
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
				links.push()
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

console.log({ nodes, links, linkObj })

const data = {
	nodes,
	links: { source: "whythough?", target: "dyl_pykl" }
};

export default data;