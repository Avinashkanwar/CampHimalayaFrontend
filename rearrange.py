with open("src/Compunents/Camp/CampDetailScreen.jsx", "r") as f:
    lines = f.readlines()

# 1. Modify line 72-73 to add the wrapper
for i in range(len(lines)):
    if ") : (" in lines[i] and "<div className=\"grid lg:grid-cols-3 gap-12\">" in lines[i+1]:
        lines[i+1] = '          <div className="space-y-12">\n            <div className="grid lg:grid-cols-3 gap-12">\n'
        break

# 2. Extract bottom sections (lines 140 to 192)
# Wait, let's locate them dynamically
am_idx = [i for i, l in enumerate(lines) if "{/* Amenities List */}" in l][0]
right_idx = [i for i, l in enumerate(lines) if "{/* Right Side (Booking Panel) */}" in l][0]
# The closing div for the left column is right before the right panel
left_close_idx = right_idx - 1

bottom_sections = lines[am_idx:left_close_idx]

# 3. Find end of grid
end_idx = right_idx
while not lines[end_idx].strip() == ")}":
    end_idx += 1

# end_idx is where ")} " is. The line before it is the closing div of the grid.
grid_close_idx = end_idx - 1

# 4. Construct new lines
new_lines = lines[:am_idx] + lines[left_close_idx:grid_close_idx+1]
new_lines += ["\n            {/* Full Width Sections Below */}\n", "            <div className=\"space-y-12\">\n"]
new_lines += ["  " + l for l in bottom_sections] # indent a bit more
new_lines += ["            </div>\n"]
new_lines += ["          </div>\n"] # close the space-y-12 wrapper
new_lines += lines[end_idx:]

with open("src/Compunents/Camp/CampDetailScreen.jsx", "w") as f:
    f.writelines(new_lines)
print("Done")
