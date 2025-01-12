import json
import random

# Dimensions de la grille
rows, cols = 1000, 1000

# Générer une grille initiale remplie de '0'
grid = [['0' for _ in range(cols)] for _ in range(rows)]

# Placement de 'S' (case de départ) à une position aléatoire
start_x, start_y = 0, 0
grid[start_x][start_y] = 'S'

goal_x, goal_y = 999, 999
grid[goal_x][goal_y] = 'G'

# Placement de 'G' (case d'arrivée) avec une distance de Manhattan > 1500 par rapport à 'S'
# while True:
#     goal_x, goal_y = random.randint(0, rows-1), random.randint(0, cols-1)
#     manhattan_distance = abs(goal_x - start_x) + abs(goal_y - start_y)
#     if manhattan_distance > 5:
#         grid[goal_x][goal_y] = 'G'
#         break

# Placement aléatoire de 1000 à 1500 cases 'X' (obstacles)
num_obstacles = random.randint(300000, 350000)
obstacles_added = 0
while obstacles_added < num_obstacles:
    obs_x, obs_y = random.randint(0, rows-1), random.randint(0, cols-1)
    if grid[obs_x][obs_y] == '0':  # Ne pas écraser 'S' ou 'G'
        grid[obs_x][obs_y] = 'X'
        obstacles_added += 1

# Création du JSON demandé
output = {
    "grid": grid,
    "solution": [],
    "positions": {
        "start": {"row": start_x, "column": start_y},
        "goal": {"row": goal_x, "column": goal_y}
    }
}

# Écrire le résultat dans un fichier JSON
output_file_path = "./src/algorithm/graph-traversal/a-star/fixtures/1000x1000.json"
with open(output_file_path, "w") as f:
    json.dump(output, f, indent=4)

output_file_path
