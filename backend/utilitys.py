def es_numero_valido(string):
    try:
        float(string)
        return True
    except ValueError:
        return False