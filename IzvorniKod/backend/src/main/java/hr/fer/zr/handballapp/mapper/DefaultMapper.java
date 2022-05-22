package hr.fer.zr.handballapp.mapper;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public interface DefaultMapper<K, V> {

    V map(K from);

    default List<V> mapToList(Collection<K> from) {
        return from.stream().map(this::map).collect(Collectors.toList());
    }

}
