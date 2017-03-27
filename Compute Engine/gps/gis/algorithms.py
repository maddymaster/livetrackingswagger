def is_left(P0, P1, P2):
    return (P1[0] - P0[0]) * (P2[1] - P0[1]) - (P2[0] - P0[0]) * (P1[1] - P0[1])

def cn_PnPoly(P, V):
    cn = 0
    V = tuple(V[:])+(V[0],)

    for i in range(len(V)-1):
        if ((V[i][1] <= P[1] and V[i+1][1] > P[1])
            or (V[i][1] > P[1] and V[i+1][1] <= P[1])):
            vt = (P[1] - V[i][1]) / float(V[i+1][1] - V[i][1])
            if P[0] < V[i][0] + vt * (V[i+1][0] - V[i][0]):
                cn += 1
                
    return cn % 2

def wn_PnPoly(P, V):
    wn = 0
    V = tuple(V[:]) + (V[0],)

    for i in range(len(V)-1):     
        if V[i][1] <= P[1]:        
            if V[i+1][1] > P[1]:     
                if is_left(V[i], V[i+1], P) > 0:
                    wn += 1        
        else:                      
            if V[i+1][1] <= P[1]:    
                if is_left(V[i], V[i+1], P) < 0:
                    wn -= 1           
    return wn

