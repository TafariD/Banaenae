import json

d = {}
with open ('alltime.json') as f:
	d = json.load(f)

def dictToList(d):
	l = []

	for k in d:
		f_obj = {}
		f_obj["name"] = k
		f_obj['score'] = d[k]
		l.append(f_obj)
	return l

with open ('alltime.json','w') as f:
	json.dump(l, f, sort_keys = True, indent = 4, ensure_ascii = False)

